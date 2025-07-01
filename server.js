const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'JMC Group API is running' });
});

// Handle form submissions
app.post('/api/subscribe', (req, res) => {
  const { firstName, lastName, email, company, industry, newsletter, events } = req.body;
  
  // Here you would typically save to a database
  console.log('New subscription:', { firstName, lastName, email, company, industry, newsletter, events });
  
  res.json({ 
    success: true, 
    message: 'Subscription successful!',
    data: { firstName, lastName, email }
  });
});

app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, company, subject, message } = req.body;
  
  // Here you would typically save to a database and send email
  console.log('New contact form submission:', { firstName, lastName, email, company, subject, message });
  
  res.json({ 
    success: true, 
    message: 'Message sent successfully! We will get back to you soon.',
    data: { firstName, lastName, email, subject }
  });
});

app.get('/api/quote', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random?tags=business|inspirational', {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });
    res.json([{ quote: response.data.content, author: response.data.author }]);
  } catch (error) {
    console.error('Quote API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Could not fetch quote' });
  }
});

// Serve the main HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'contact.html'));
});

app.get('/subscribe', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'subscribe.html'));
});

app.get('/industries', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'industries.html'));
});

app.get('/consulting-services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'consulting-services.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 JMC Group server running on http://localhost:${PORT}`);
  console.log(`📧 API endpoints available at http://localhost:${PORT}/api/`);
}); 