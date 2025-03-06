import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle, XCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export const FunctionTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [testResults, setTestResults] = useState<{
    netlifyFunctions?: { success: boolean; data?: any; error?: string };
    hubspotFunction?: { success: boolean; data?: any; error?: string };
    directHubSpotAccess?: { success: boolean; data?: any; error?: string };
  }>({});
  const [error, setError] = useState<string | null>(null);

  const checkNetlifyFunctions = async () => {
    try {
      console.log('Testing Netlify Functions...');
      
      // Test the test function
      const testResponse = await axios.get('/.netlify/functions/test');
      console.log('Test function response:', testResponse.data);
      
      // If we got here, the test function is working
      return {
        success: true,
        data: testResponse.data
      };
    } catch (error) {
      console.error('Error testing Netlify Functions:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const testHubSpotFunction = async () => {
    try {
      console.log('Testing HubSpot function...');
      
      // Test a simple GET request to the HubSpot function
      const response = await axios.get('/.netlify/functions/hubspot/crm/v3/properties/contacts', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('HubSpot function response status:', response.status);
      
      return {
        success: true,
        data: {
          status: response.status,
          statusText: response.statusText,
          hasData: !!response.data
        }
      };
    } catch (error) {
      console.error('Error testing HubSpot function:', error);
      
      // If we get a 401 Unauthorized, that means the function is working but the API key is invalid
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return {
          success: true,
          data: {
            status: 401,
            statusText: 'Unauthorized - Function is working but API key may be invalid',
            error: error.response?.data
          }
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  };

  const testDirectHubSpotAccess = async () => {
    try {
      console.log('Testing direct HubSpot access...');
      
      // Test a direct request to HubSpot API (this should fail with CORS error)
      const response = await axios.get('https://api.hubapi.com/crm/v3/properties/contacts', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_HUBSPOT_API_KEY}`
        },
        timeout: 5000 // 5 second timeout
      });
      
      // If we get here, there's no CORS error (unusual)
      return {
        success: true,
        data: {
          status: response.status,
          statusText: response.statusText,
          message: 'Direct access to HubSpot API works (no CORS error)'
        }
      };
    } catch (error) {
      console.error('Error testing direct HubSpot access:', error);
      
      // Check if it's a CORS error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const isCorsError = errorMessage.includes('CORS') || 
                          errorMessage.includes('cross-origin') ||
                          errorMessage.includes('Cross-Origin');
      
      if (isCorsError) {
        return {
          success: false,
          error: 'CORS error detected - This is expected and confirms the need for a proxy',
          data: {
            message: errorMessage,
            isCorsError: true
          }
        };
      }
      
      // If it's an authentication error, that's actually good - means CORS isn't blocking
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return {
          success: true,
          data: {
            status: 401,
            statusText: 'Unauthorized - But no CORS error, which is unusual',
            message: 'Authentication failed but request went through (no CORS error)'
          }
        };
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const runTests = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Test Netlify Functions
      const netlifyFunctionsResult = await checkNetlifyFunctions();
      
      // Update results with Netlify Functions test
      setTestResults(prev => ({
        ...prev,
        netlifyFunctions: netlifyFunctionsResult
      }));
      
      // Test direct HubSpot access (should fail with CORS error)
      const directHubSpotResult = await testDirectHubSpotAccess();
      
      // Update results with direct HubSpot test
      setTestResults(prev => ({
        ...prev,
        directHubSpotAccess: directHubSpotResult
      }));
      
      // If Netlify Functions are working, test the HubSpot function
      if (netlifyFunctionsResult.success) {
        const hubspotFunctionResult = await testHubSpotFunction();
        
        // Update results with HubSpot function test
        setTestResults(prev => ({
          ...prev,
          hubspotFunction: hubspotFunctionResult
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-light py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-display text-primary mb-6">Netlify Functions Test</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-accent animate-spin mr-3" />
              <p className="text-lg">Testing Netlify Functions...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h2 className="text-xl text-red-600 font-semibold mb-2 flex items-center">
                <XCircle className="w-6 h-6 mr-2" />
                Error
              </h2>
              <p className="text-red-700">{error}</p>
              <button 
                onClick={runTests}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Tests
              </button>
            </div>
          ) : (
            <>
              {/* Netlify Functions Test Results */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  {testResults.netlifyFunctions?.success ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 mr-2" />
                  )}
                  Netlify Functions Test
                </h2>
                
                {testResults.netlifyFunctions?.success ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <p className="text-green-700 mb-4">Netlify Functions are working correctly!</p>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h3 className="font-medium mb-2">Function Details:</h3>
                      <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-60">
                        {JSON.stringify(testResults.netlifyFunctions.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <p className="text-red-700 mb-2">Netlify Functions test failed.</p>
                    <p className="text-red-600">{testResults.netlifyFunctions?.error}</p>
                    
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-medium mb-2 flex items-center">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                        Troubleshooting
                      </h3>
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                        <li>Check if the Netlify Functions are properly deployed</li>
                        <li>Verify that the <code>netlify/functions/test.js</code> file exists in your repository</li>
                        <li>Check the Netlify deployment logs for any errors</li>
                        <li>Make sure the <code>netlify.toml</code> file is correctly configured</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Direct HubSpot Access Test Results */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  {testResults.directHubSpotAccess?.success ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
                  )}
                  Direct HubSpot API Access Test
                </h2>
                
                {testResults.directHubSpotAccess?.success ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <p className="text-yellow-700 mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Direct access to HubSpot API works without CORS errors. This is unusual and may indicate that CORS is being handled by a browser extension or proxy.
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h3 className="font-medium mb-2">Response Details:</h3>
                      <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-60">
                        {JSON.stringify(testResults.directHubSpotAccess.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <p className="text-green-700 mb-4">
                      Direct access to HubSpot API failed with CORS errors as expected. This confirms the need for a proxy.
                    </p>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <h3 className="font-medium mb-2">Error Details:</h3>
                      <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-60">
                        {JSON.stringify(testResults.directHubSpotAccess.error, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
              
              {/* HubSpot Function Test Results */}
              {testResults.netlifyFunctions?.success && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    {testResults.hubspotFunction?.success ? (
                      <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500 mr-2" />
                    )}
                    HubSpot Function Test
                  </h2>
                  
                  {testResults.hubspotFunction?.success ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <p className="text-green-700 mb-4">
                        HubSpot function is deployed and accessible!
                        {testResults.hubspotFunction.data?.status === 401 && (
                          <span className="block mt-2 text-yellow-600">
                            Note: Received a 401 Unauthorized response, which means the function is working but the API key may be invalid.
                          </span>
                        )}
                      </p>
                      
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h3 className="font-medium mb-2">Response Details:</h3>
                        <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-60">
                          {JSON.stringify(testResults.hubspotFunction.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <p className="text-red-700 mb-2">HubSpot function test failed.</p>
                      <p className="text-red-600">{testResults.hubspotFunction?.error}</p>
                      
                      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="font-medium mb-2 flex items-center">
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                          Troubleshooting
                        </h3>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                          <li>Check if the <code>netlify/functions/hubspot.js</code> file exists in your repository</li>
                          <li>Verify that the HubSpot API key is correctly set in the Netlify environment variables</li>
                          <li>Check the Netlify Function logs for any errors</li>
                          <li>Make sure the <code>netlify.toml</code> redirects are correctly configured</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-center mt-8">
                <button 
                  onClick={runTests}
                  className="px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-lg flex items-center transition-colors"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Run Tests Again
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};