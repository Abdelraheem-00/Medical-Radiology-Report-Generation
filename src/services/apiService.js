// API Service that can work with or without backend
import MockApiService from './mockApiService.js';

class ApiService {
  constructor() {
    this.mockService = new MockApiService();
    this.baseUrl = 'http://localhost:5000/api';
  }

  // Check if backend is available
  async isBackendAvailable() {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        timeout: 3000 // 3 second timeout
      });
      return response.ok;
    } catch (error) {
      console.log('Backend not available, switching to mock mode');
      return false;
    }
  }

  // Generate caption with automatic fallback to mock
  async generateCaption(imageFile) {
    // Check if mock mode is forced or if backend is unavailable
    if (MockApiService.shouldUseMock()) {
      console.log('Using mock API for caption generation');
      return await this.mockService.generateCaption(imageFile);
    }

    try {
      // Try real backend first
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch(`${this.baseUrl}/generate-caption`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.log('Backend failed, falling back to mock API:', error.message);
      // Automatically enable mock mode on failure
      MockApiService.enableMockMode();
      return await this.mockService.generateCaption(imageFile);
    }
  }

  // Generate PDF with automatic fallback to client-side generation
  async generatePdf(imageFile) {
    // Note: PDF generation is now handled client-side in the component
    // This method is kept for potential future backend PDF generation
    
    // Check if mock mode is forced or if we should try backend
    if (MockApiService.shouldUseMock()) {
      console.log('Mock mode enabled - PDF will be generated client-side');
      // Return null to indicate client-side generation should be used
      return null;
    }

    try {
      // Try real backend first
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch(`${this.baseUrl}/generate-pdf`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        return await response.blob();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
    } catch (error) {
      console.log('Backend PDF generation failed, using client-side generation:', error.message);
      // Return null to indicate client-side generation should be used
      return null;
    }
  }

  // Toggle mock mode
  toggleMockMode() {
    if (MockApiService.shouldUseMock()) {
      MockApiService.disableMockMode();
    } else {
      MockApiService.enableMockMode();
    }
  }

  // Get current mode
  getCurrentMode() {
    return MockApiService.shouldUseMock() ? 'mock' : 'backend';
  }
}

// Export singleton instance
export default new ApiService();