// Global variables
let uploadedImageFile = null;
let currentCaption = '';

// DOM Elements
const imageInput = document.getElementById('imageInput');
const uploadPlaceholder = document.getElementById('uploadPlaceholder');
const uploadedImage = document.getElementById('uploadedImage');
const imageUploadArea = document.getElementById('imageUploadArea');
const generateCaptionBtn = document.getElementById('generateCaptionBtn');
const captionDisplay = document.getElementById('captionDisplay');
const saveCaseBtn = document.getElementById('saveCaseBtn');
const generateReportBtn = document.getElementById('generateReportBtn');

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    setupImageUpload();
    setupButtons();
    setupFormValidation();
});

// Image upload functionality
function setupImageUpload() {
    // Click to upload
    imageUploadArea.addEventListener('click', () => {
        imageInput.click();
    });

    // File input change
    imageInput.addEventListener('change', handleImageSelect);

    // Drag and drop
    imageUploadArea.addEventListener('dragover', handleDragOver);
    imageUploadArea.addEventListener('dragleave', handleDragLeave);
    imageUploadArea.addEventListener('drop', handleDrop);
}

function handleImageSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        displayImage(file);
        uploadedImageFile = file;
        generateCaptionBtn.disabled = false;
    }
}

function handleDragOver(event) {
    event.preventDefault();
    imageUploadArea.classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    imageUploadArea.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    imageUploadArea.classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        const file = files[0];
        displayImage(file);
        uploadedImageFile = file;
        generateCaptionBtn.disabled = false;
        
        // Update the file input
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        imageInput.files = dataTransfer.files;
    }
}

function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = 'block';
        uploadPlaceholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// Button event handlers
function setupButtons() {
    generateCaptionBtn.addEventListener('click', generateCaption);
    saveCaseBtn.addEventListener('click', saveCase);
    generateReportBtn.addEventListener('click', generateReport);
}

async function generateCaption() {
    if (!uploadedImageFile) {
        showError('Please upload an image first.');
        return;
    }

    try {
        generateCaptionBtn.classList.add('loading');
        generateCaptionBtn.textContent = 'Generating...';
        generateCaptionBtn.disabled = true;

        const formData = new FormData();
        formData.append('image', uploadedImageFile);

        const response = await fetch('/api/generate-caption', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            currentCaption = data.caption;
            captionDisplay.innerHTML = `<p>${data.caption}</p>`;
            captionDisplay.classList.remove('placeholder-text');
            showSuccess('AI analysis generated successfully!');
        } else {
            showError(data.error || 'Failed to generate caption');
        }

    } catch (error) {
        console.error('Error generating caption:', error);
        showError('Network error. Please try again.');
    } finally {
        generateCaptionBtn.classList.remove('loading');
        generateCaptionBtn.textContent = 'Generate Analysis';
        generateCaptionBtn.disabled = false;
    }
}

async function saveCase() {
    try {
        const caseData = collectFormData();
        
        saveCaseBtn.classList.add('loading');
        saveCaseBtn.textContent = 'Saving...';
        saveCaseBtn.disabled = true;

        const response = await fetch('/api/save-case', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...caseData,
                aiCaption: currentCaption
            })
        });

        const data = await response.json();

        if (data.success) {
            showSuccess(`Case saved successfully! Case ID: ${data.case_id}`);
        } else {
            showError(data.error || 'Failed to save case');
        }

    } catch (error) {
        console.error('Error saving case:', error);
        showError('Network error. Please try again.');
    } finally {
        saveCaseBtn.classList.remove('loading');
        saveCaseBtn.textContent = 'Save Case';
        saveCaseBtn.disabled = false;
    }
}

async function generateReport() {
    if (!uploadedImageFile) {
        showError('Please upload an image first.');
        return;
    }

    try {
        const caseData = collectFormData();
        
        generateReportBtn.classList.add('loading');
        generateReportBtn.textContent = 'Generating PDF...';
        generateReportBtn.disabled = true;

        const formData = new FormData();
        formData.append('image', uploadedImageFile);
        
        // Add all form data to FormData
        Object.entries(caseData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Create blob and download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `xray_analysis_report_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            showSuccess('PDF report generated and downloaded successfully!');
        } else {
            const errorData = await response.json();
            showError(errorData.error || 'Failed to generate PDF report');
        }

    } catch (error) {
        console.error('Error generating report:', error);
        showError('Network error. Please try again.');
    } finally {
        generateReportBtn.classList.remove('loading');
        generateReportBtn.textContent = 'Generate PDF Report';
        generateReportBtn.disabled = false;
    }
}

// Helper functions
function collectFormData() {
    return {
        patientName: document.getElementById('patientName').value,
        patientAge: document.getElementById('patientAge').value,
        patientGender: document.getElementById('patientGender').value,
        patientId: document.getElementById('patientId').value,
        studyDate: document.getElementById('studyDate').value,
        referringPhysician: document.getElementById('referringPhysician').value,
        patientHistory: document.getElementById('patientHistory').value,
        findings: document.getElementById('findings').value,
        caseDiagnosis: document.getElementById('caseDiagnosis').value
    };
}

function showError(message) {
    removeExistingMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.main-content'));
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function showSuccess(message) {
    removeExistingMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.container').insertBefore(successDiv, document.querySelector('.main-content'));
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 5000);
}

function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => {
        if (msg.parentNode) {
            msg.parentNode.removeChild(msg);
        }
    });
}

function setupFormValidation() {
    // Set today's date as default for study date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('studyDate').value = today;
    
    // Add real-time validation if needed
    const requiredFields = ['patientName', 'patientAge', 'patientId'];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#d1d5db';
            }
        });
    });
}

// Health check on page load
async function checkSystemHealth() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        if (!data.model_loaded) {
            showError('AI model is not loaded. Please contact system administrator.');
        }
    } catch (error) {
        console.error('Health check failed:', error);
        showError('System health check failed. Some features may not work properly.');
    }
}

// Run health check when page loads
window.addEventListener('load', checkSystemHealth);