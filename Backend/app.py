from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms
from PIL import Image
import numpy as np
import nltk
from collections import Counter
import io
import base64
import logging
import os

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
logger.info(f"Using device: {device}")

class Tokenizer:
    def __init__(self, word2idx):
        self.word2idx = word2idx
        self.idx2word = {v: k for k, v in word2idx.items()}
        
        self.pad_token = "<PAD>"
        self.unk_token = "<UNK>"
        self.sos_token = "<SOS>"
        self.eos_token = "<EOS>"
        
        self.pad_id = self.word2idx[self.pad_token]
        self.unk_id = self.word2idx[self.unk_token]
        self.sos_id = self.word2idx[self.sos_token]
        self.eos_id = self.word2idx[self.eos_token]
        
        self.vocab_size = len(word2idx)

    def encode(self, sentence, add_special_tokens=True):
        tokens = nltk.word_tokenize(sentence.lower())
        token_ids = [self.word2idx.get(token, self.unk_id) for token in tokens]
        
        if add_special_tokens:
            token_ids = [self.sos_id] + token_ids + [self.eos_id]
        
        return token_ids

    def decode(self, token_ids, skip_special_tokens=True):
        words = []
        for idx in token_ids:
            word = self.idx2word.get(idx, self.unk_token)
            if skip_special_tokens and word in {self.pad_token, self.sos_token, self.eos_token}:
                continue
            words.append(word)
        
        return " ".join(words)

class ImageEncoder(nn.Module):
    def __init__(self, embed_dim=512):
        super(ImageEncoder, self).__init__()
        effnet = models.efficientnet_b4(pretrained=False)
        
        self.backbone = effnet.features
        
        for param in self.backbone.parameters():
            param.requires_grad = False
        
        self.pool = nn.AdaptiveAvgPool2d((7, 7))
        self.flatten = nn.Flatten(2)
        self.transpose = lambda x: x.permute(0, 2, 1)
        self.project = nn.Linear(1792, embed_dim)

    def forward(self, x):
        x = self.backbone(x)
        x = self.pool(x)
        x = self.flatten(x)
        x = self.transpose(x)
        x = self.project(x)
        return x

class PositionalEmbedding(nn.Module):
    def __init__(self, vocab_size, max_len, embed_dim):
        super(PositionalEmbedding, self).__init__()
        self.token_embedding = nn.Embedding(vocab_size, embed_dim)
        self.position_embedding = nn.Embedding(max_len, embed_dim)

    def forward(self, x):
        positions = torch.arange(0, x.size(1), device=x.device).unsqueeze(0)
        pos_embed = self.position_embedding(positions)
        tok_embed = self.token_embedding(x)
        return tok_embed + pos_embed

class TransformerEncoderBlock(nn.Module):
    def __init__(self, embed_dim, num_heads, ff_dim, dropout=0.1):
        super().__init__()
        self.self_attn = nn.MultiheadAttention(embed_dim, num_heads, dropout=dropout, batch_first=True)
        self.ff = nn.Sequential(
            nn.Linear(embed_dim, ff_dim),
            nn.ReLU(),
            nn.Linear(ff_dim, embed_dim)
        )
        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        attn_output, _ = self.self_attn(x, x, x)
        x = self.norm1(x + self.dropout(attn_output))
        
        ff_output = self.ff(x)
        x = self.norm2(x + self.dropout(ff_output))
        
        return x

class TransformerDecoderBlock(nn.Module):
    def __init__(self, embed_dim, num_heads, ff_dim, dropout=0.1):
        super().__init__()
        self.self_attn = nn.MultiheadAttention(embed_dim, num_heads, dropout=dropout, batch_first=True)
        self.cross_attn = nn.MultiheadAttention(embed_dim, num_heads, dropout=dropout, batch_first=True)
        self.ff = nn.Sequential(
            nn.Linear(embed_dim, ff_dim),
            nn.ReLU(),
            nn.Linear(ff_dim, embed_dim)
        )
        self.norm1 = nn.LayerNorm(embed_dim)
        self.norm2 = nn.LayerNorm(embed_dim)
        self.norm3 = nn.LayerNorm(embed_dim)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, enc_out, tgt_mask=None):
        _x = self.norm1(x + self.dropout(self.self_attn(x, x, x, attn_mask=tgt_mask)[0]))
        _x = self.norm2(_x + self.dropout(self.cross_attn(_x, enc_out, enc_out)[0]))
        out = self.norm3(_x + self.dropout(self.ff(_x)))
        return out

class CaptionDecoder(nn.Module):
    def __init__(self, vocab_size, embed_dim, ff_dim, num_heads, max_len, num_layers):
        super().__init__()
        self.pos_embed = PositionalEmbedding(vocab_size, max_len, embed_dim)
        self.dec_layers = nn.ModuleList([
            TransformerDecoderBlock(embed_dim, num_heads, ff_dim) 
            for _ in range(num_layers)
        ])
        self.output_proj = nn.Linear(embed_dim, vocab_size)

    def make_causal_mask(self, size):
        return torch.triu(torch.ones(size, size), diagonal=1).bool()

    def forward(self, tgt, enc_out):
        x = self.pos_embed(tgt)
        
        B, T, _ = x.shape
        mask = self.make_causal_mask(T).to(x.device)
        
        for layer in self.dec_layers:
            x = layer(x, enc_out, tgt_mask=mask)
        
        logits = self.output_proj(x)
        return logits

class ImageCaptioningModel(nn.Module):
    def __init__(self, cnn_encoder, transformer_encoder, decoder, tokenizer):
        super().__init__()
        self.cnn_encoder = cnn_encoder
        self.transformer_encoder = transformer_encoder
        self.decoder = decoder
        self.tokenizer = tokenizer

    def forward(self, images, captions):
        img_features = self.cnn_encoder(images)
        encoded_img = self.transformer_encoder(img_features)
        logits = self.decoder(captions, encoded_img)
        return logits

    def generate(self, image, max_length=100, beam_width=3, device='cuda', length_penalty=0.7):
        import math
        self.eval()
        with torch.no_grad():
            image = image.unsqueeze(0).to(device)
            img_features = self.cnn_encoder(image)
            encoded_img = self.transformer_encoder(img_features)

            beam = [([self.tokenizer.sos_id], 0.0)]

            for _ in range(max_length):
                candidates = []
                for seq, score in beam:
                    if seq[-1] == self.tokenizer.eos_id:
                        candidates.append((seq, score))
                        continue

                    input_ids = torch.tensor(seq).unsqueeze(0).to(device)
                    logits = self.decoder(input_ids, encoded_img)
                    probs = torch.softmax(logits[0, -1, :], dim=-1)

                    topk_probs, topk_ids = probs.topk(beam_width)

                    for prob, idx in zip(topk_probs, topk_ids):
                        new_seq = seq + [idx.item()]
                        new_score = score + math.log(prob.item() + 1e-12)
                        candidates.append((new_seq, new_score))

                beam = sorted(
                    candidates,
                    key=lambda x: x[1] / ((len(x[0]) ** length_penalty) if length_penalty > 0 else 1),
                    reverse=True
                )[:beam_width]

                if all(seq[-1] == self.tokenizer.eos_id for seq, _ in beam):
                    break

            best_seq = beam[0][0]
            return self.tokenizer.decode(best_seq, skip_special_tokens=True)

# Global variables for model and preprocessing
model = None
tokenizer = None
image_transforms = None

def load_model():
    global model, tokenizer, image_transforms
    
    try:
        # Create word2idx vocabulary (placeholder - this should be loaded from saved vocab)
        # For now, creating minimal vocab for demo
        word2idx = {"<PAD>": 0, "<UNK>": 1, "<SOS>": 2, "<EOS>": 3}
        
        # Add some common medical terms for demo
        common_words = [
            "no", "normal", "clear", "lung", "heart", "chest", "findings", "impression",
            "effusion", "pneumonia", "opacity", "consolidation", "atelectasis", "pleural",
            "cardiac", "mediastinal", "pulmonary", "bilateral", "right", "left", "lower",
            "upper", "middle", "lobe", "field", "border", "shadow", "density", "mass",
            "nodule", "lesion", "unchanged", "stable", "improved", "worsened", "acute",
            "chronic", "mild", "moderate", "severe", "markings", "vascular", "bronchial"
        ]
        
        for i, word in enumerate(common_words, 4):
            word2idx[word] = i
        
        tokenizer = Tokenizer(word2idx)
        
        # Model parameters
        embed_dim = 512
        ff_dim = 512
        num_heads = 8
        num_decoder_layers = 4
        vocab_size = tokenizer.vocab_size
        max_len = 102

        # Initialize model components
        cnn_encoder = ImageEncoder(embed_dim=embed_dim)
        transformer_encoder = TransformerEncoderBlock(
            embed_dim=embed_dim, 
            num_heads=num_heads, 
            ff_dim=ff_dim
        )
        decoder = CaptionDecoder(
            vocab_size=vocab_size,
            embed_dim=embed_dim,
            ff_dim=ff_dim,
            num_heads=num_heads,
            max_len=max_len,
            num_layers=num_decoder_layers
        )

        model = ImageCaptioningModel(
            cnn_encoder=cnn_encoder,
            transformer_encoder=transformer_encoder,
            decoder=decoder,
            tokenizer=tokenizer
        ).to(device)

        # Load trained weights if available
        model_path = "X-ray_transformer_model.pt"
        if os.path.exists(model_path):
            model.load_state_dict(torch.load(model_path, map_location=device))
            logger.info("Model weights loaded successfully")
        else:
            logger.warning("Model weights not found, using random initialization")

        model.eval()

        # Image preprocessing
        img_size = (512, 512)
        image_transforms = transforms.Compose([
            transforms.Resize(img_size),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5], std=[0.5])
        ])

        logger.info("Model loaded successfully")
        
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        raise

def preprocess_image(image_data):
    try:
        # Handle base64 encoded images
        if isinstance(image_data, str):
            if image_data.startswith('data:image'):
                header, encoded = image_data.split(',', 1)
                image_data = base64.b64decode(encoded)
            else:
                image_data = base64.b64decode(image_data)
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        
        # Apply transforms
        if image_transforms:
            image_tensor = image_transforms(image)
        else:
            raise ValueError("Image transforms not initialized")
        
        return image_tensor
    
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        raise

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "device": device})

@app.route('/generate-report', methods=['POST'])
def generate_report():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        # Get image from request
        if 'image' not in request.files and 'image_data' not in request.json:
            return jsonify({"error": "No image provided"}), 400
        
        # Handle file upload
        if 'image' in request.files:
            file = request.files['image']
            if file.filename == '':
                return jsonify({"error": "No file selected"}), 400
            
            image_data = file.read()
        
        # Handle base64 image data
        elif 'image_data' in request.json:
            image_data = request.json['image_data']
        
        # Preprocess image
        image_tensor = preprocess_image(image_data)
        
        # Generate report
        with torch.no_grad():
            generated_report = model.generate(
                image_tensor, 
                max_length=100, 
                device=device
            )
        
        return jsonify({
            "report": generated_report,
            "status": "success"
        })
    
    except Exception as e:
        logger.error(f"Error generating report: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    return jsonify({
        "vocab_size": tokenizer.vocab_size if tokenizer else 0,
        "device": device,
        "model_loaded": model is not None
    })

if __name__ == '__main__':
    try:
        load_model()
        app.run(debug=True, host='0.0.0.0', port=5000)
    except Exception as e:
        logger.error(f"Failed to start application: {str(e)}")