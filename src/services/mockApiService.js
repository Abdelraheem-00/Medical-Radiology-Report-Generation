// Mock API service to replace backend dependencies
// This service simulates the Flask backend responses for development without requiring the actual backend

class MockApiService {
  constructor() {
    // Mock medical findings for different types of X-rays
    this.mockFindings = [
      "The chest X-ray demonstrates clear lung fields bilaterally with no evidence of acute cardiopulmonary process. The cardiac silhouette appears normal in size and configuration. No pleural effusions or pneumothorax identified. Bone structures appear intact without obvious fractures.",
      
      "Frontal chest radiograph shows normal lung expansion with clear lung fields. The heart size is within normal limits. No focal consolidation, pleural effusion, or pneumothorax is seen. The mediastinal contours are unremarkable. Osseous structures appear normal.",
      
      "The lungs are well-expanded and clear without focal consolidation. Cardiac size and mediastinal contours are within normal limits. No pleural effusion or pneumothorax identified. The visualized osseous structures show no acute abnormalities.",
      
      "Clear lung fields bilaterally with no evidence of infiltrates or masses. Normal cardiac size and configuration. No pleural effusion or pneumothorax present. The diaphragm is appropriately positioned and the costophrenic angles are sharp.",
      
      "Normal appearing chest X-ray with clear lung fields. The heart appears normal in size. No acute findings such as consolidation, effusion, or pneumothorax are identified. Bone structures within the field of view appear unremarkable."
    ];
  }

  // Simulate the generate-caption API endpoint
  async generateCaption(imageFile) {
    // Simulate API processing time
    await this.delay(2000 + Math.random() * 2000); // 2-4 seconds

    // Return a random mock finding
    const randomIndex = Math.floor(Math.random() * this.mockFindings.length);
    const caption = this.mockFindings[randomIndex];

    return {
      caption: caption,
      status: "success",
      processing_time: Math.random() * 3 + 1, // 1-4 seconds
      confidence: Math.random() * 0.2 + 0.8 // 80-100% confidence
    };
  }

  // Simulate the generate-pdf API endpoint
  async generatePdf(imageFile) {
    // Simulate PDF generation time
    await this.delay(1000 + Math.random() * 1000); // 1-2 seconds

    try {
      // Try to create a proper PDF using jsPDF if available
      if (typeof window !== 'undefined' && window.jsPDF) {
        const { jsPDF } = window.jsPDF;
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text('MOCK RADIOLOGY REPORT', 20, 30);
        doc.setFontSize(12);
        doc.text('Generated in Demo Mode', 20, 50);
        doc.text(`Generated at: ${new Date().toLocaleString()}`, 20, 70);
        doc.text('This is a sample PDF generated without backend.', 20, 90);
        
        return doc.output('blob');
      } else {
        // Fallback: Create a simple text blob
        const pdfContent = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/Parent 2 0 R/Resources<</Font<</F1 4 0 R>>>>/MediaBox[0 0 612 792]/Contents 5 0 R>>endobj
4 0 obj<</Type/Font/Subtype/Type1/BaseFont/Times-Roman>>endobj
5 0 obj<</Length 44>>stream
BT /F1 18 Tf 100 700 Td (Mock PDF Report) Tj ET
endstream endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000317 00000 n 
trailer<</Size 6/Root 1 0 R>>
startxref
409
%%EOF`;
        
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        return blob;
      }
    } catch (error) {
      console.warn('PDF generation failed, using text fallback:', error);
      // Final fallback: simple text file
      const textContent = `MOCK RADIOLOGY REPORT\n\nGenerated in Demo Mode\nGenerated at: ${new Date().toLocaleString()}\n\nThis is a sample report generated without backend.`;
      return new Blob([textContent], { type: 'text/plain' });
    }
  }

  // Helper method to simulate async delays
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Check if we should use mock data (when backend is not available)
  static shouldUseMock() {
    // You can add logic here to detect if backend is available
    // For now, we'll provide a simple way to toggle
    return localStorage.getItem('useMockApi') === 'true' || 
           window.location.search.includes('mock=true');
  }

  // Enable mock mode
  static enableMockMode() {
    localStorage.setItem('useMockApi', 'true');
    console.log('Mock API mode enabled');
  }

  // Disable mock mode
  static disableMockMode() {
    localStorage.setItem('useMockApi', 'false');
    console.log('Mock API mode disabled');
  }
}

export default MockApiService;