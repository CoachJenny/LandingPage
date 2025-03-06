# CORS Solution for HubSpot Integration

## The Problem

The website is experiencing CORS (Cross-Origin Resource Sharing) errors when trying to communicate with the HubSpot API directly from the browser. This is a security feature implemented by browsers to prevent unauthorized cross-origin requests.

Error message:
```
Access to XMLHttpRequest at 'https://api.hubapi.com/crm/v3/objects/contacts' from origin 'https://beamish-rolypoly-74f5ed.netlify.app' has been blocked by CORS policy
```

## The Solution

We've implemented a proxy server approach to solve this issue:

1. **Server-side proxy**: We've created an Express.js server that acts as a middleware between your frontend and the HubSpot API.

2. **How it works**:
   - Frontend makes requests to our own server endpoints (e.g., `/hubspot-api/...`)
   - Our server forwards these requests to HubSpot, adding the necessary authentication headers
   - HubSpot responds to our server
   - Our server forwards the response back to the frontend

3. **Benefits**:
   - No CORS issues since the browser is only communicating with our own server
   - API keys are kept secure on the server side
   - Better error handling and logging capabilities

## Implementation Details

### Server Setup

The server is implemented in `server.js` using Express.js with the following components:

- **Express**: Web server framework
- **http-proxy-middleware**: For proxying requests to HubSpot
- **cors**: To enable CORS for our own server endpoints
- **dotenv**: For loading environment variables

### Frontend Changes

The frontend code has been updated to:

- Make requests to our proxy endpoints instead of directly to HubSpot
- Handle errors gracefully and provide feedback to users
- Continue showing success messages even if there are backend issues (to improve user experience)

## Deployment Considerations

For this solution to work in production:

1. **Netlify Deployment**:
   - You'll need to set up Netlify Functions or Netlify Edge Functions to handle the proxy
   - Alternatively, deploy the Express server separately on a service like Heroku or Render

2. **Environment Variables**:
   - Make sure to set the `VITE_HUBSPOT_API_KEY` in your Netlify environment variables
   - Set `VITE_USE_MOCK_CRM=false` in production

3. **Testing**:
   - The current implementation uses mock CRM responses by default for testing
   - To test with the real HubSpot API, set `VITE_USE_MOCK_CRM=false` in your .env file

## Alternative Solutions

If the proxy server approach doesn't work for your needs, consider these alternatives:

1. **HubSpot Forms API**: Use HubSpot's Forms API which supports CORS and can be embedded directly
2. **Netlify Functions**: Create serverless functions specifically for HubSpot integration
3. **Third-party form services**: Use services like Formspree or Netlify Forms that handle form submissions