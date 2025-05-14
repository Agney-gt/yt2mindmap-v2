"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState,useEffect } from 'react';

interface SignInButtonProps {
  text: string;
}

export default function SignInButton({ text }: SignInButtonProps) {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(0);
  const getCount = async () => {
    const response = await fetch("/api/getSubscriberCount", { method: "GET" });
    const data = await response.json();
    setCount(data.result);}
  useEffect(() => {
    getCount();
    
    
  }, []);
  const handleClick = async () => {
    
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/mindmap" });
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }}
  return (
    <div id="button" className={`${count >= 5 ? 'block' : 'hidden'}`}>
    <Button onClick={handleClick}  disabled={loading }
      size="lg" className="gap-1">
      {text} <ArrowRight className="h-4 w-4" />
      
      { loading ? '' : ''}
    </Button></div>
  );
}
