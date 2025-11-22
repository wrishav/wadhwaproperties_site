#!/bin/bash

# Wadhwa Properties - API Test Script

echo "🧪 Testing Wadhwa Properties API Endpoints"
echo "=========================================="

BASE_URL="http://localhost:3000"

# Test 1: Health Check
echo "📋 Testing Health Check..."
HEALTH_RESPONSE=$(curl -s "$BASE_URL/api/health")
echo "Response: $HEALTH_RESPONSE"
echo ""

# Test 2: Test Email Configuration
echo "📧 Testing Email Configuration..."
EMAIL_TEST_RESPONSE=$(curl -s "$BASE_URL/api/test-email")
echo "Response: $EMAIL_TEST_RESPONSE"
echo ""

# Test 3: Contact Form Submission
echo "📝 Testing Contact Form..."
CONTACT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "API Test User",
    "phone": "+919876543210",
    "email": "test@example.com",
    "service": "consultation",
    "message": "This is a test message from the API test script"
  }')
echo "Response: $CONTACT_RESPONSE"
echo ""

# Test 4: Main Website
echo "🌐 Testing Main Website..."
WEBSITE_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
echo "Website Status Code: $WEBSITE_RESPONSE"
echo ""

echo "✅ API Testing Complete!"
echo "=========================================="
echo "🌐 Website: $BASE_URL"
echo "📋 Health: $BASE_URL/api/health"
echo "📧 Test Email: $BASE_URL/api/test-email"
echo ""
echo "If all tests pass, your backend is working correctly!"
