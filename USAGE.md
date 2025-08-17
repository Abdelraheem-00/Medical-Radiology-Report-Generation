# MedRadio AI - Usage Guide

## Overview
MedRadio AI is a medical imaging analysis platform that can work both with a backend AI service or in standalone demo mode.

## Running Modes

### 🎯 Demo Mode (Recommended for Testing)
Demo mode works completely offline using realistic sample medical reports.

**To start in demo mode:**
```bash
./start_demo.sh
```

Or manually:
```bash
npm run dev -- --port 3000
```
Then visit: `http://localhost:3000/?mock=true`

### 🔗 Backend Mode (Full AI Analysis)
Backend mode connects to the Flask AI server for real medical image analysis.

**Prerequisites:**
1. Start the Flask backend server:
   ```bash
   cd Backend
   python app.py
   ```

2. Start the React app:
   ```bash
   npm run dev -- --port 3000
   ```

3. Visit: `http://localhost:3000`

## Features in Both Modes

### ✅ Available Features:
- **Patient Data Entry**: Complete patient information forms
- **Image Upload**: Upload medical images (X-rays, CT scans, MRI)
- **Report Generation**: Generate detailed medical reports
- **PDF Export**: Download reports as PDF files
- **Print Preview**: Preview reports before printing
- **Responsive Design**: Works on desktop and mobile devices

### 🔄 Mode Switching:
- Use the settings button (⚙️) in the top-right corner
- Toggle between "Demo Mode" and "Backend Mode"
- The app automatically falls back to Demo Mode if backend is unavailable

## Demo Mode Details

### Sample Data:
- **Realistic Medical Reports**: Based on actual radiology report templates
- **Multiple Findings**: Variety of normal and abnormal findings
- **Processing Simulation**: Realistic loading times and animations
- **Full PDF Generation**: Complete PDF reports with medical formatting

### Automatic Fallback:
- If the backend becomes unavailable, the app automatically switches to Demo Mode
- Visual indicator shows current mode status
- No functionality is lost in Demo Mode

## Technical Details

### Dependencies:
- **Frontend**: React 19, Material-UI, jsPDF
- **Backend** (optional): Flask, PyTorch, PIL
- **Mock Service**: Built-in JavaScript service

### File Structure:
```
src/
├── services/
│   ├── apiService.js          # Main API service with fallback
│   └── mockApiService.js      # Mock backend implementation
├── components/
│   └── MockModeIndicator.jsx  # Mode switching UI
└── pages/
    └── ReportGenerationPage.jsx # Main application page
```

## Troubleshooting

### Common Issues:

1. **Port Already in Use**:
   ```bash
   npm run dev -- --port 3001
   ```

2. **Backend Connection Failed**:
   - The app automatically switches to Demo Mode
   - Check if Flask server is running on port 5000
   - Use Demo Mode for development/testing

3. **PDF Download Issues**:
   - Demo Mode includes fallback PDF generation
   - PDF files are generated client-side using jsPDF

### Support:
- Check the browser console for detailed error messages
- Demo Mode provides full functionality for testing and demonstrations
- All features work offline in Demo Mode

## Development

### Adding New Mock Data:
Edit `src/services/mockApiService.js` to add new sample medical findings.

### Customizing Fallback Behavior:
Modify `src/services/apiService.js` to change how the app handles backend failures.

### UI Customization:
The mode indicator can be styled or hidden by editing `src/components/MockModeIndicator.jsx`.