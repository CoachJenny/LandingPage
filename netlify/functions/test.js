// Simple test function to verify Netlify Functions are working
exports.handler = async function(event, context) {
  console.log('Test function invoked');
  
  // Get environment variables to check if they're properly set
  const hubspotApiKey = process.env.VITE_HUBSPOT_API_KEY || 'Not set';
  const mockCrmMode = process.env.VITE_USE_MOCK_CRM || 'Not set';
  
  // Check if the hubspot function exists by checking if we can require it
  let hubspotFunctionExists = false;
  try {
    require('./hubspot');
    hubspotFunctionExists = true;
  } catch (error) {
    hubspotFunctionExists = false;
  }
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    body: JSON.stringify({
      status: 'success',
      message: 'Netlify Functions are working!',
      timestamp: new Date().toISOString(),
      environment: {
        hubspotApiKey: hubspotApiKey ? 'Set (hidden for security)' : 'Not set',
        mockCrmMode: mockCrmMode
      },
      functions: {
        test: 'Available',
        hubspot: hubspotFunctionExists ? 'Available' : 'Not available'
      }
    })
  };
};