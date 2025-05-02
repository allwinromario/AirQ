import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const TestApi = () => {
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("test-" + Date.now() + "@example.com");
  const [password, setPassword] = useState("password123");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDirectRegister = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      const result = await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      setResponse(JSON.stringify(result.data, null, 2));
      console.log("Direct API call successful:", result.data);
    } catch (err) {
      console.error("Direct API call error:", err);
      setError(err.message + (err.response ? ": " + JSON.stringify(err.response.data) : ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <Link
        to="/"
        className="absolute top-6 left-6 text-white flex items-center gap-2 hover:text-blue-400 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Home</span>
      </Link>

      <Card className="w-full max-w-lg bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-center">API Connection Test</CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Test the connection to the backend API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
          </div>

          <Button
            onClick={handleDirectRegister}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Testing..." : "Test Direct API Call"}
          </Button>

          {response && (
            <div className="mt-4 p-3 bg-green-900/30 border border-green-500 rounded-md">
              <h3 className="text-green-400 font-semibold mb-2">Success Response:</h3>
              <pre className="text-xs text-green-300 overflow-auto max-h-40 p-2 bg-black/50 rounded">
                {response}
              </pre>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded-md">
              <h3 className="text-red-400 font-semibold mb-2">Error:</h3>
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-gray-400">
            This page tests the direct connection to the backend API
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestApi; 