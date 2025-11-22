# Email Setup Guide for Wadhwa Properties

## Current Status
❌ **Emails are NOT being sent currently**
- Form submissions work and are logged to console
- Email credentials in `.env` need to be configured

## How to Enable Email Functionality

### Step 1: Create Gmail App Password

**IMPORTANT:** You CANNOT use your regular Gmail password. You must create an "App Password".

1. **Go to your Google Account**
   - Visit: https://myaccount.google.com/

2. **Enable 2-Factor Authentication** (if not already enabled)
   - Go to Security → 2-Step Verification
   - Follow the setup process

3. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Or: Security → 2-Step Verification → App passwords
   - Select app: **Mail**
   - Select device: **Other (Custom name)** → Enter "Wadhwa Properties"
   - Click **Generate**
   - Google will show you a **16-character password** (like: abcd efgh ijkl mnop)
   - **COPY THIS PASSWORD** - you won't see it again!

### Step 2: Update .env File

Open the `.env` file in your project and update these lines:

```env
# Replace with YOUR Gmail address
EMAIL_USER=wadhwaproperties16@gmail.com

# Replace with the 16-character App Password you just generated
EMAIL_PASS=abcd efgh ijkl mnop

# This is where inquiry emails will be sent (can be same as EMAIL_USER)
OWNER_EMAIL=wadhwaproperties16@gmail.com

# Keep these as they are
PORT=3000
NODE_ENV=production
```

**Example:**
```env
EMAIL_USER=wadhwaproperties16@gmail.com
EMAIL_PASS=xqzy wbcd efgh pqrs
OWNER_EMAIL=wadhwaproperties16@gmail.com
PORT=3000
NODE_ENV=production
```

### Step 3: Restart the Server

After updating the `.env` file:

```bash
# Stop the current server (Ctrl+C in terminal)
# Then start again:
npm start
```

Or if using development mode:
```bash
npm run dev
```

### Step 4: Test Email Functionality

**Option A: Test Email Endpoint**
```bash
curl http://localhost:3000/api/test-email
```

**Option B: Submit the Contact Form**
- Go to http://localhost:3000
- Scroll to contact form
- Fill in all fields
- Click "Send Message"
- Check your email inbox!

## What You'll Receive

When someone submits the form, you'll get **2 emails**:

### Email 1: To You (Property Owner)
**Subject:** New Property Inquiry - Wadhwa Properties

**Content:**
- Customer Name
- Phone Number
- Email Address
- Service Required
- Message
- Timestamp

### Email 2: Auto-Reply to Customer
**Subject:** Thank you for contacting Wadhwa Properties

**Content:**
- Confirmation of inquiry received
- Your contact details
- Business hours
- Professional branded message

## Troubleshooting

### Error: "Invalid login: Username and Password not accepted"
**Solution:**
- Make sure you're using App Password, NOT regular Gmail password
- Verify 2-Factor Authentication is enabled
- Regenerate App Password if needed
- Check for typos in EMAIL_USER and EMAIL_PASS

### Error: "EAUTH" or "Authentication failed"
**Solution:**
- Verify EMAIL_USER is correct Gmail address
- Regenerate App Password
- Make sure there are no extra spaces in .env file

### Emails not arriving
**Solution:**
- Check spam folder
- Verify OWNER_EMAIL is correct
- Check server logs for errors
- Test with: `curl http://localhost:3000/api/test-email`

### Want to use a different email service?
Currently configured for Gmail. To use other services (Outlook, Yahoo, etc.), the `server.js` file would need to be modified with different SMTP settings.

## Security Notes

✅ **DO NOT** commit `.env` file to Git (it's in .gitignore)
✅ **DO NOT** share your App Password publicly
✅ Keep the App Password secure like a regular password
✅ If compromised, revoke it from Google Account settings

## Production Deployment

When deploying to a hosting service:

1. **Set environment variables** in your hosting platform (Render, Vercel, etc.)
2. **Do NOT include** the `.env` file in your deployment
3. **Use production email address** for EMAIL_USER
4. **Generate new App Password** for production

## Current Alternative (Without Email Setup)

If you don't set up email:
- Form submissions still work
- Data is logged to server console
- You can see submissions in terminal
- No emails are sent

---

**Need Help?** 
Check the server logs for detailed error messages or contact support.

**Server is running?**
Visit: http://localhost:3000/api/health to check email configuration status.
