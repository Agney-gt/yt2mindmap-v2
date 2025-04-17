"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Label } from "@/components/ui/label"
export default function PricingPage() {
  const [tosAccepted, setTosAccepted] = useState(false);

  const handleTosCheck = async (checked: boolean) => {
    setTosAccepted(checked);
    if (checked) {
      try {
        const response = await fetch('/api/tos-check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.error('Failed to update TOS status');
        }
      } catch (error) {
        console.error('Error updating TOS status:', error);
      }
    }
  };

  return (
           <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 ">
            <div className="mx-auto flex max-w-[58rem] flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ownership over Subscriptions
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border bg-background">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For Doomscrollers</CardDescription>
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
                      <span>No recurring fees.</span>
                    </li>
                  </ul>
                  <Button className="mt-6 w-full">Get Started</Button>
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
                      <span>Boosts productivity.</span>
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
                      <span>Discord Community for Builders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Anchor your learning</span>
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
                  <div className="flex items-start space-x-2 mt-4">
                    <Checkbox
                      id="refund-policy"
                      checked={tosAccepted}
                      onCheckedChange={handleTosCheck}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="refund-policy"
                        className="text-sm text-muted-foreground"
                      >
                        By checking this box, you acknowledge and agree to our Refund Policy: Due to the digital nature of our products, all sales are final. Refunds will only be granted in the case of duplicate payments or technical issues that prevent access, and only within 7 days of purchase.
                      </Label>
                    </div>
                  </div>
                  <Button
                    className="mt-6 w-full"
                    onClick={() => window.location.href = "https://payhip.com/order?link=KSaXZ"}
                    disabled={!tosAccepted}
                  >
                    Start Pro
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
                <li>I was skeptical about using AI without breaking the bank... until I found this approach. (No API Keys required)</li>
                <li>We discovered a VC-backed startup with $5M in funding — leveraging their foundation helped us keep costs predictable.</li>
                <li>AI infrastructure is becoming more affordable, much like how railroads, telecom, and compute commoditized over time.</li>
                <li>Its intriguing how major players are driving costs down, echoing Jevons Paradox and making advanced tech accessible to more of us.</li>
                <li>Curious how you can build AI apps on a shoestring budget? Read my book!</li>
              </ul>
                  <Button className="mt-6 w-full">Buy Now</Button>
                  <p className="mt-2 text-xs text-center text-muted-foreground">Its always the same old story</p>
                </CardContent>
                </Card>
            </div>
          </div>
        </section>
  )
}
