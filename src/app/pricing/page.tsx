"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import BuyButton from "@/components/buyButton"


export default function PricingPage() {
  
  
  
  

  return (
           <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 ">
            <div className="mx-auto flex max-w-[58rem] flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="flex text-center justify-center  text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                To ensure a seamless experience for paying customers, will scale infrastructure based on demand so seats are limited. Get 40% off using code: 6FST916O3R.
              </p>
              
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border bg-background">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>For Time-Conscious Learners</CardDescription>
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
                  Limited Seats
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For Mindful Content Consumers</CardDescription>
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
                      <span>Service Quality Assurance </span>
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
                      <span>Exclusive Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Limited Seats</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Dedicated Infrastructure</span>
                    </li>
                  </ul>
                    
                    <a href="https://payhip.com/order?link=KSaXZ" target="_blank" rel="noopener noreferrer">
                      <BuyButton/>
                    </a>
                    
                  <p className="mt-2 text-xs text-center text-muted-foreground">30-day money-back guarantee</p>
                </CardContent>
                
              </Card>
              
            </div>
          </div></div>
        </section>
  )
}
