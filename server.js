
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5000', 'http://127.0.0.1:5000'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (corsOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Email configuration - using a test account for development
let transporter;

// Initialize email transporter if credentials are provided
if (process.env.EMAIL_USER && 
    process.env.EMAIL_PASS && 
    process.env.EMAIL_USER !== 'your-actual-gmail@gmail.com' && 
    process.env.EMAIL_PASS !== 'your-16-character-app-password') {
    
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    // Verify transporter configuration
    transporter.verify(function(error, success) {
        if (error) {
            console.log('❌ Email configuration error:', error.message);
            console.log('💡 Please check your .env file and ensure:');
            console.log('   1. EMAIL_USER is your correct Gmail address');
            console.log('   2. EMAIL_PASS is your Gmail App Password (not regular password)');
            console.log('   3. 2-factor authentication is enabled on your Google account');
            console.log('   4. App Password is generated for "Mail" service');
            
            // Disable transporter if verification fails
            transporter = null;
        } else {
            console.log('✅ Email server is ready to send messages');
        }
    });
} else {
    console.log('⚠️  Email credentials not configured. Email functionality will be disabled.');
    console.log('📝 To enable email:');
    console.log('   1. Edit .env file with your Gmail credentials');
    console.log('   2. Use Gmail App Password (not regular password)');
    console.log('   3. Restart the server');
}

// Test email configuration
app.get('/api/test-email', async (req, res) => {
    try {
        if (!transporter) {
            return res.status(400).json({
                success: false,
                message: 'Email service not configured. Please set EMAIL_USER and EMAIL_PASS in .env file.',
                user: process.env.EMAIL_USER || 'Not configured'
            });
        }
        
        // Verify transporter configuration
        await transporter.verify();
        res.json({ 
            success: true, 
            message: 'Email configuration is working!',
            user: process.env.EMAIL_USER
        });
    } catch (error) {
        console.error('Email configuration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Email configuration error',
            error: error.message 
        });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        console.log('📝 Contact form submission received:', req.body);
        
        const { name, email, phone, service, message } = req.body;

        // Enhanced validation
        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            });
        }
        
        if (!phone || !phone.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }
        
        if (email && !email.includes('@')) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        // Check if email is configured
        if (!transporter) {
            console.log('📝 Email not configured, storing inquiry in console');
            console.log('📋 New Inquiry:', { 
                name, 
                email: email || 'Not provided', 
                phone, 
                service: service || 'Not specified', 
                message: message || 'No message' 
            });
            
                    // In development mode, simulate success
        if (process.env.NODE_ENV === 'development') {
            console.log('🔄 Development mode: Simulating email success');
            console.log('📧 Inquiry would be sent to:', process.env.OWNER_EMAIL || 'wadhwaproperties16@gmail.com');
            return res.json({
                success: true,
                message: 'Thank you! Your message has been received. We will contact you within 24 hours.',
                note: 'Development mode - email service not configured, inquiry logged to console'
            });
        }
            
            return res.json({
                success: true,
                message: 'Thank you! Your message has been received. We will contact you within 24 hours.',
                note: 'Email service not configured - inquiry logged to console'
            });
        }

        // Email to owner
        const mailToOwner = {
            from: process.env.EMAIL_USER,
            to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
            subject: `New Property Inquiry from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0F4C81;">New Property Inquiry - Wadhwa Properties</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #333;">Contact Details:</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
                    </div>
                    ${message ? `
                    <div style="background: #fff; padding: 20px; border-left: 4px solid #0F4C81;">
                        <h3 style="color: #333;">Message:</h3>
                        <p>${message}</p>
                    </div>
                    ` : ''}
                </div>
            `
        };

        // Auto-reply to customer
        const mailToCustomer = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Wadhwa Properties',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0F4C81;">Thank You for Your Inquiry!</h2>
                    <p>Dear ${name},</p>
                    <p>Thank you for contacting Wadhwa Properties. We have received your inquiry and will get back to you within 24 hours.</p>
                    <div style="background: #0F4C81; color: white; padding: 20px; border-radius: 8px; margin: 30px 0;">
                        <h3 style="margin-top: 0;">Contact Us Directly:</h3>
                        <p><strong>Phone:</strong> +91 98106 23803</p>
                        <p><strong>Email:</strong> wadhwaproperties16@gmail.com</p>
                        <p><strong>Office:</strong> H.No 178, Sector 16, Faridabad</p>
                    </div>
                </div>
            `
        };

        // Send both emails
        const [ownerResult, customerResult] = await Promise.all([
            transporter.sendMail(mailToOwner),
            transporter.sendMail(mailToCustomer)
        ]);
        
        console.log('✅ Emails sent successfully:', {
            owner: ownerResult.messageId,
            customer: customerResult.messageId
        });

        res.json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        
        // Log the inquiry even if email fails
        console.log('Failed Inquiry (logged):', req.body);
        
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again or call us directly at +91 98106 23803.'
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Wadhwa Properties API is running!',
        timestamp: new Date().toISOString(),
        emailConfigured: !!transporter
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    
    // Handle CORS errors specifically
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            success: false,
            message: 'CORS error: Origin not allowed',
            error: 'Please check your CORS configuration'
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Wadhwa Properties server running on port ${PORT}`);
    console.log(`📧 Email configured: ${transporter ? 'Yes' : 'No'}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📧 Test email endpoint: http://localhost:${PORT}/api/test-email`);
    
    if (!transporter) {
        console.log('⚠️  To enable email functionality:');
        console.log('   1. Set EMAIL_USER and EMAIL_PASS in .env file');
        console.log('   2. Use Gmail App Password (not regular password)');
        console.log('   3. Restart the server');
    }
});