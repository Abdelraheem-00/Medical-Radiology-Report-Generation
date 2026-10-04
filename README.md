# 🩺 Medical Radiology Report Generation

## 📌 Overview
Medical Radiology Report Generation is an AI-powered project designed to assist in **automatically generating medical radiology reports** from imaging data.  
The goal is to reduce the workload on radiologists, improve reporting efficiency, and minimize time by leveraging **Computer Vision and natural language processing (NLP)**.

---


## 🚀 Features
- ✅ Text preprocessing with **Word2Vec embeddings**  
- ✅ Image preprocessing & **augmentation** for robustness  
- ✅ **EfficientNet** as the image encoder  
- ✅ Transformer **encoder–decoder architecture** for report generation  
- ✅ Evaluation with **BLEU, ROUGE, and BERTScore**  
- ✅ Demo app with **(React + Flask/Odoo backend)** for uploading X-rays and generating reports
---

## 🛠️ Tech Stack
- **Frontend**: React.js  
- **Backend**: Python (Flask / FastAPI) 
- **Deep Learning**: PyTorch 
---
## Model Architecture
X-ray Image → EfficientNet (Image Encoder) → Transformer Encoder
Report Text → Word2Vec Embedding → Transformer Decoder → Generated Report
---

## 📊 Results

The model was evaluated on the test set using standard text generation metrics:

| Metric      | Score   |
|-------------|---------|
| **BLEU-1**  | 0.3891  |
| **BLEU-2**  | 0.1783  |
| **BLEU-3**  | 0.1055  |
| **BLEU-4**  | 0.0696  |
| **METEOR**  | 0.3696  |
| **ROUGE-1** | 0.4275  |
| **ROUGE-2** | 0.1849  |
| **ROUGE-L** | 0.3238  |
| **BERTScore** | 0.8588 |

✅ **Interpretation**:  
- Higher **BLEU-1** shows decent unigram overlap with ground truth reports.  
- **ROUGE-1/2/L** capture strong recall of medical terms.  
- **BERTScore (0.86)** indicates high **semantic similarity** between generated and reference reports.  


## 📂 Project Structure

Medical-Radiology-Report-Generation/
- │── frontend/ # React.js UI
- │── backend/ # Flask/FastAPI 
- │── models/ # Trained ML models for image analysis and NLP
- │── reports/ # Generated medical reports
- │── docs/ # Documentation & references

---

## 📖 References
1. **Chest X-rays (Indiana University Dataset)**  
   🔗 https://www.kaggle.com/datasets/raddar/chest-xrays-indiana-university  

2. **Automated Radiology Report Generation using Conditioned Transformers**  
   🔗 https://www.sciencedirect.com/science/article/pii/S2352914821000472?via%3Dihub  
