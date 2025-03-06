// For Netlify Functions, we need to use CommonJS syntax
const https = require('https');
const querystring = require('querystring');

exports.handler = async function(event, context) {
  // Log the event for debugging
  console.log('HubSpot function invoked with event:', JSON.stringify({
    path: event.path,
    httpMethod: event.httpMethod,
    headers: Object.keys(event.headers),
    queryStringParameters: event.queryStringParameters,
    body: event.body ? '(body present)' : '(no body)'
  }));

  // Handle OPTIONS requests for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'CORS preflight response' })
    };
  }

  // Extract the path from the URL (everything after /hubspot/)
  const pathMatch = event.path.match(/\/\.netlify\/functions\/hubspot\/?(.*)$/);
  const path = pathMatch && pathMatch[1] ? pathMatch[1] : '';
  
  // Build the full HubSpot API URL
  let apiUrl = `https://api.hubapi.com/${path}`;
  
  // Add query parameters if present
  if (event.queryStringParameters) {
    const queryParams = querystring.stringify(event.queryStringParameters);
    if (queryParams) {
      apiUrl += (apiUrl.includes('?') ? '&' : '?') + queryParams;
    }
  }
  
  // Get the API key from environment variables
  const apiKey = process.env.VITE_HUBSPOT_API_KEY;
  
  if (!apiKey) {
    console.error('Missing HubSpot API key in environment variables');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: "Missing HubSpot API key", 
        message: "The HubSpot API key is not configured in environment variables."
      })
    };
  }
  
  // Parse the request body if present
  let requestBody;
  if (event.body) {
    try {
      requestBody = JSON.parse(event.body);
      console.log('Request body parsed:', JSON.stringify(requestBody));
    } catch (error) {
      console.error('Error parsing request body:', error);
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: "Invalid request body", 
          message: "The request body could not be parsed as JSON."
        })
      };
    }
  }
  
  console.log(`Proxying ${event.httpMethod} request to: ${apiUrl}`);
  
  try {
    // Make the request to HubSpot API
    const response = await new Promise((resolve, reject) => {
      const options = {
        method: event.httpMethod,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      };
      
      console.log(`Making request to HubSpot with options:`, {
        url: apiUrl,
        method: options.method,
        headers: Object.keys(options.headers)
      });
      
      const req = https.request(apiUrl, options, (res) => {
        let responseBody = '';
        
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        
        res.on('end', () => {
          console.log(`HubSpot response status: ${res.statusCode}`);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: responseBody
          });
        });
      });
      
      req.on('error', (error) => {
        console.error('Error making request to HubSpot:', error);
        reject(error);
      });
      
      if (requestBody) {
        const bodyString = JSON.stringify(requestBody);
        console.log(`Sending request body: ${bodyString}`);
        req.write(bodyString);
      }
      
      req.end();
    });
    
    // Parse the response body as JSON if possible
    let parsedBody;
    try {
      parsedBody = JSON.parse(response.body);
      console.log('Response body parsed successfully');
    } catch (e) {
      console.log('Response body is not JSON, using as is');
      parsedBody = response.body;
    }
    
    // Return the response to the client
    return {
      statusCode: response.statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: typeof parsedBody === 'string' ? parsedBody : JSON.stringify(parsedBody)
    };
  } catch (error) {
    console.error("Error proxying to HubSpot:", error);
    
    // Return an error to the client
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: "Error proxying request to HubSpot",
        details: error.message
      })
    };
  }
};