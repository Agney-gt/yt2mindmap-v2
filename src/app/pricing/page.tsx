import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import PricingPage from "./client";

export default async function CPricingPage() {
  let flag = false
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    flag = true;
  }

  return (
    <PricingPage flag={flag}/>
  );
}