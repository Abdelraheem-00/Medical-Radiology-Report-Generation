#!/bin/bash

# Start the React app in demo mode (mock mode enabled)
echo "🚀 Starting MedRadio AI in Demo Mode..."
echo "📱 Demo mode uses realistic sample data and works completely offline"
echo "🌐 Opening browser at http://localhost:3000/?mock=true"
echo ""
echo "💡 You can toggle between Demo Mode and Backend Mode using the settings in the top-right corner"
echo ""

# Open browser with mock mode enabled
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:3000/?mock=true" &
elif command -v open > /dev/null; then
    open "http://localhost:3000/?mock=true" &
fi

# Start the development server
npm run dev -- --port 3000