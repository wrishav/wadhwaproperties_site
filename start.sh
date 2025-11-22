#!/bin/bash

# Wadhwa Properties - Startup Script

echo "🏠 Starting Wadhwa Properties Website..."
echo "========================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env from template..."
    cp env-template.txt .env
    echo "✅ .env file created from template"
    echo "🔧 Please edit .env file with your email credentials before starting the server"
    echo "📖 See README.md for detailed setup instructions"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if email is configured
if grep -q "your-gmail@gmail.com" .env; then
    echo "⚠️  Email not configured in .env file"
    echo "📧 Please update EMAIL_USER and EMAIL_PASS in .env file"
    echo "🔐 Use Gmail App Password (not regular password)"
    echo ""
    echo "Starting server anyway (email will be disabled)..."
fi

echo "🚀 Starting server..."
echo "🌐 Server will be available at: http://localhost:3000"
echo "📋 Health check: http://localhost:3000/api/health"
echo "📧 Test email: http://localhost:3000/api/test-email"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"

# Start the server
npm start
