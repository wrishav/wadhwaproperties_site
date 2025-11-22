# Wadhwa Properties Website

A modern, responsive real estate website for Wadhwa Properties, serving Faridabad since 2001.

## Features

- 🏠 **Modern Design**: Beautiful, responsive design with Royal Blue & Emerald Teal color scheme
- 📱 **Mobile-First**: Optimized for all devices
- 🌙 **Dark/Light Theme**: Toggle between themes
- 📧 **Contact Form**: Integrated email functionality
- 🗺️ **Google Maps Integration**: Office location with embedded map
- 💬 **WhatsApp Integration**: Direct WhatsApp contact buttons
- 📞 **Click-to-Call**: One-tap phone calling
- 🎨 **Smooth Animations**: Enhanced user experience with scroll animations

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the environment template and configure your email settings:

```bash
cp env-template.txt .env
```

Edit `.env` file with your Gmail credentials:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
OWNER_EMAIL=wadhwaproperties16@gmail.com
PORT=3000
NODE_ENV=development
```

### 3. Gmail App Password Setup
To enable email functionality, you need a Gmail App Password:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Step Verification** if not already enabled
3. Go to **Security** → **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Generate the 16-character password
6. Use this password in your `.env` file

### 4. Start the Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Server status and email configuration

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/test-email` - Test email configuration

### Static Files
- `GET /` - Main website
- `GET /style.css` - Stylesheet
- `GET /app.js` - Frontend JavaScript

## File Structure

```
wadhwa-properties-final/
├── server.js          # Express.js backend server
├── app.js            # Frontend JavaScript with enhanced features
├── index.html        # Main website HTML
├── style.css         # CSS styles with modern design
├── package.json      # Node.js dependencies
├── .env              # Environment variables (create from template)
├── env-template.txt  # Environment configuration template
└── README.md         # This file
```

## Features Breakdown

### Frontend Enhancements
- **Theme Toggle**: Switch between light and dark themes
- **Scroll Progress**: Visual progress indicator
- **Form Validation**: Real-time input validation
- **Smooth Scrolling**: Enhanced navigation experience
- **Responsive Design**: Mobile-first approach
- **Interactive Elements**: Hover effects and animations

### Backend Features
- **Express.js Server**: Fast, reliable Node.js backend
- **Email Integration**: Nodemailer with Gmail SMTP
- **CORS Support**: Cross-origin request handling
- **Error Handling**: Comprehensive error management
- **Request Logging**: Detailed request tracking
- **Health Monitoring**: API health endpoints

### Email Functionality
- **Auto-reply**: Confirmation email to customers
- **Owner Notification**: Inquiry details sent to property owner
- **Professional Templates**: Beautiful HTML email formatting
- **Fallback Handling**: Console logging when email is disabled

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses nodemon for automatic server restart on file changes.

### Testing Email Configuration
```bash
curl http://localhost:3000/api/test-email
```

### Testing Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"+919876543210","email":"test@example.com","service":"consultation","message":"Test message"}'
```

## Troubleshooting

### Email Not Working
1. Check `.env` file configuration
2. Verify Gmail App Password (not regular password)
3. Ensure 2-factor authentication is enabled
4. Check server logs for error messages

### CORS Issues
1. Verify CORS_ORIGINS in `.env` file
2. Check browser console for CORS errors
3. Ensure frontend and backend ports match

### Server Won't Start
1. Check if port 3000 is available
2. Verify all dependencies are installed
3. Check `.env` file syntax

## Production Deployment

### Environment Variables
Set production environment variables:
```env
NODE_ENV=production
PORT=3000
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-production-app-password
```

### Process Management
Use PM2 for production process management:
```bash
npm install -g pm2
pm2 start server.js --name "wadhwa-properties"
pm2 startup
pm2 save
```

## Contact Information

- **Primary Contact**: +91 98106 23803
- **Secondary Contact**: +91 70110 84247
- **Email**: wadhwaproperties16@gmail.com
- **Office**: H.No 178, Sector 16, Faridabad, Haryana 121002

## License

This project is proprietary to Wadhwa Properties. All rights reserved.

---

**Built with ❤️ for Wadhwa Properties - Serving Faridabad since 2001**
# wadhwaproperties_site
