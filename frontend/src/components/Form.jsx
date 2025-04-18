"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, User, Lock } from 'lucide-react';
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";
  const alternateRoute = method === "login" ? "/register" : "/login";
  const alternateText = method === "login" ? "Need an account?" : "Already have an account?";
  const alternateAction = method === "login" ? "Register" : "Login";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post(route, {
        username,
        password,
      });
      
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(
        error.response?.data?.detail || 
        error.response?.data?.message || 
        "Authentication failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 relative overflow-hidden">
      
      <Card 
        className={`w-full max-w-md shadow-lg transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <CardHeader className="space-y-1">
          <CardTitle className={`text-2xl font-bold tracking-tight transition-all duration-500 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}>
            {name}
          </CardTitle>
          <CardDescription 
            className={`text-zinc-500 dark:text-zinc-400 transition-all duration-500 ease-out delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            {method === "login" 
              ? "Enter your credentials to access your account" 
              : "Create an account to get started"}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert 
                variant="destructive" 
                className="bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800 animate-shake"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div 
              className={`space-y-2 transition-all duration-500 ease-out delay-200 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <Label htmlFor="username">Username</Label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 transition-all border-zinc-200"
                  required
                />
              </div>
            </div>
            
            <div 
              className={`space-y-2 mb-10 transition-all duration-500 ease-out delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 transition-all border-zinc-200"
                  required
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter 
            className={`flex flex-col space-y-4 transition-all duration-500 ease-out delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <Button 
              type="submit" 
              className="w-full relative overflow-hidden group"
              disabled={loading}
            >
              <span className="absolute inset-0 w-full h-full"></span>
              <span className="relative flex items-center justify-center">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : name}
              </span>
            </Button>
            
            <div className="text-sm text-center text-zinc-500 dark:text-zinc-400">
              {alternateText}{" "}
              <a 
                href={alternateRoute} 
                className="font-medium text-zinc-900 "
              >
                {alternateAction}
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Form;
