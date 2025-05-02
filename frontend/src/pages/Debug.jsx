import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bug, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { runAllTests, testApiConnection, testRegistration } from '../debug-api';

const Debug = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleRunTests = async () => {
    setLoading(true);
    setError(null);
    try {
      const testResults = await runAllTests();
      setResults(testResults);
    } catch (err) {
      console.error('Error running tests:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const connectionTest = await testApiConnection();
      setResults(prev => ({ ...prev, connection: connectionTest }));
    } catch (err) {
      console.error('Error testing connection:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTestRegistration = async () => {
    setLoading(true);
    setError(null);
    try {
      const registrationTest = await testRegistration();
      setResults(prev => ({ ...prev, registration: registrationTest }));
    } catch (err) {
      console.error('Error testing registration:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-space-dark to-black flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Link 
        to="/" 
        className="self-start mb-8 text-white flex items-center gap-2 hover:text-space-blue transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Home</span>
      </Link>
      
      <Card className="w-full max-w-4xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-lg shadow-blue-900/20">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <Bug className="h-6 w-6" />
            API Debug Tool
          </CardTitle>
          <CardDescription className="text-gray-400">
            Test the connection between frontend and backend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleRunTests} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Bug className="h-4 w-4 mr-2" />}
              Run All Tests
            </Button>
            <Button 
              onClick={handleTestConnection} 
              variant="outline" 
              className="border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
              disabled={loading}
            >
              Test Connection
            </Button>
            <Button 
              onClick={handleTestRegistration} 
              variant="outline" 
              className="border-green-500/30 text-green-500 hover:bg-green-500/10"
              disabled={loading}
            >
              Test Registration
            </Button>
          </div>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-md p-4 text-white">
              <p className="font-medium flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                Error
              </p>
              <p className="mt-1 text-sm text-gray-300">{error}</p>
            </div>
          )}
          
          {results && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Test Results</h3>
              
              {/* Connection Test Results */}
              {results.connection && (
                <div className={`border rounded-md p-4 ${
                  results.connection.success ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
                }`}>
                  <p className="font-medium flex items-center gap-2 text-white">
                    {results.connection.success 
                      ? <CheckCircle className="h-5 w-5 text-green-500" /> 
                      : <XCircle className="h-5 w-5 text-red-500" />}
                    API Connection Test: {results.connection.success ? 'Successful' : 'Failed'}
                  </p>
                  <pre className="mt-2 p-3 rounded bg-black/30 text-xs text-gray-300 overflow-auto">
                    {JSON.stringify(results.connection, null, 2)}
                  </pre>
                </div>
              )}
              
              {/* Registration Test Results */}
              {results.registration && (
                <div className={`border rounded-md p-4 ${
                  results.registration.success ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
                }`}>
                  <p className="font-medium flex items-center gap-2 text-white">
                    {results.registration.success 
                      ? <CheckCircle className="h-5 w-5 text-green-500" /> 
                      : <XCircle className="h-5 w-5 text-red-500" />}
                    Registration Test: {results.registration.success ? 'Successful' : 'Failed'}
                  </p>
                  <pre className="mt-2 p-3 rounded bg-black/30 text-xs text-gray-300 overflow-auto">
                    {JSON.stringify(results.registration, null, 2)}
                  </pre>
                </div>
              )}
              
              {/* Network Details */}
              {results.network && (
                <div className="border border-blue-500/30 bg-blue-500/10 rounded-md p-4">
                  <p className="font-medium text-white">Network Details</p>
                  <pre className="mt-2 p-3 rounded bg-black/30 text-xs text-gray-300 overflow-auto">
                    {JSON.stringify(results.network, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-400">
            Use this tool to debug API connection issues
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Debug; 