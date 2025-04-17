"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SignInButtonProps {
  text: string;
}

export default function SignInButton({ text }: SignInButtonProps) {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/mindmap" })} size="lg" className="gap-1">
      {text} <ArrowRight className="h-4 w-4" />
    </Button>
  );
}
