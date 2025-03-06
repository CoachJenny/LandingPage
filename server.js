import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Log middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Proxy middleware for HubSpot API
app.use('/hubspot-api', createProxyMiddleware({
  target: 'https://api.hubapi.com',
  changeOrigin: true,
  pathRewrite: {
    '^/hubspot-api': ''
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add the authorization header with the API key
    const apiKey = process.env.VITE_HUBSPOT_API_KEY;
    console.log(`Using HubSpot API key: ${apiKey ? 'Available' : 'Not available'}`);
    
    if (apiKey) {
      proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
    }
    
    // If the request has a body, we need to restream it
    if (req.body) {
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Proxy response: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', message: err.message });
  }
}));

// Serve static files from the 'dist' directory in production
app.use(express.static(path.join(__dirname, 'dist')));

// For any other request, send the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`HubSpot API key: ${process.env.VITE_HUBSPOT_API_KEY ? 'Available' : 'Not available'}`);
  console.log(`Mock CRM mode: ${process.env.VITE_USE_MOCK_CRM === 'true' ? 'Enabled' : 'Disabled'}`);
});