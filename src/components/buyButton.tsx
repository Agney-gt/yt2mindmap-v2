"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';


export default function BuyButton() {
  const [count, setCount] = useState<number>(0);
  const getCount = async () => {
    const response = await fetch("/api/getSubscriberCount", { method: "GET" });
    const data = await response.json();
    setCount(data.result);}
  useEffect(() => {
    getCount();
    
    
  }, []);

  return (
    
      <Button className="mt-6 w-full">{count !== null ? `${count} seats remaining` : 'Loading...'}</Button>
    
  );
}
