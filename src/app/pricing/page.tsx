"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { FeedbackButton } from "@/components/FeedbackButton"
export default function PricingPage() {

  const [feedback, setFeedback] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setFeedback(newValue);
  };
  

  return (
           <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 ">
            <div className="mx-auto flex max-w-[58rem] flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Good Feedback is much appreciated, and will be rewarded with a free 18 month subscription.
              </p>
              <Input placeholder="Feedback" value={feedback} onChange ={handleInputChange}/>
              <FeedbackButton feedback={feedback} />
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border bg-background">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For Curious Explorers</CardDescription>
                  <div className="mt-4 text-4xl font-bold">$0</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>3 mind maps per day</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Youtube History as an asset</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>No subscriptions, ever.</span>
                    </li>
                  </ul>
                  
                </CardContent>
              </Card>
              <Card className="border bg-background relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For purposeful learners</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    $59.99<span className="text-base font-normal text-muted-foreground">/18 Months</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Unlimited mind maps</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span> Boost focus & retention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Keeps the tool free</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>No subscription regret</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Exclusive Builder Community</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Make Video Content Stick</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Access insights anytime</span>
                    </li>
                  </ul>
                    <Button className="mt-6 w-full">
                    <a href="https://payhip.com/order?link=KSaXZ" target="_blank" rel="noopener noreferrer">
                      Start Pro
                    </a>
                    </Button>
                  <p className="mt-2 text-xs text-center text-muted-foreground">30-day money-back guarantee</p>
                </CardContent>
                
              </Card>
              <Card>
              <CardHeader>
                  <CardTitle>Build</CardTitle>
                  <CardDescription>For Entrepreneurs</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    $9.95<span className="text-base font-normal text-muted-foreground"> for 125 a page E-Book</span>
                  </div>
                </CardHeader>
              <CardContent>
              <ul className="space-y-2 text-sm list-disc list-inside">
                <li>Skeptical about budget-friendly AI? I was too, until this no-API-key-needed trick worked.</li>
                <li>We build on the shoulders of VC backed giants. Keeping our services reliable, stable and scalable.</li>
                <li>Watching AI costs drop feels like watching Jevons Paradox in action — just like the railroads, telecom and compute before it.</li>
                <li>Here’s a little secret: building AI apps doesn’t have to break the bank. Want to know how?</li>
              </ul>
                  {/* <Button className="mt-6 w-full">Buy Now</Button> */}
                  <p className="mt-2 text-xs text-center text-muted-foreground">Its always the same old story</p>
                </CardContent>
                </Card>
            </div>
          </div>
        </section>
  )
}
