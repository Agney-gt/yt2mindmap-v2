
import Image from "next/image"
import { BrainCog,Filter,MicOff,BedDouble,PenTool, CheckCircle, Headphones, FastForward, VolumeX, SearchSlash, MoonStar, BookX, Lightbulb } from "lucide-react"
import SignInButton from "@/components/signInButton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center w-full py-12 bg-gradient-to-b from-background to-muted">
         
          <h1 className="text-3xl font-bold tracking-tighter">
                   From Brainrot to Breakthroughs
                  </h1>
                  <p className="text-center mt-4 max-w-[500px] text-muted-foreground">
                  Skip the burnout cycle of endless autoplay—engage your brain with structured mindmapping. Powered by GPT-4o
                  </p>
                  
                  <div className="mt-4 relative w-full max-w-[800px] aspect-[1574/832] overflow-hidden rounded-lg border bg-background shadow-xl">
                <Image
                  src="/mindmap+.jpg"
                  width={1574}
                  height={832}
                  alt="MindMapAI in action - converting a YouTube video into an interactive mind map"
                  className="object-cover w-full h-full "
                  priority
                /><div className="absolute bottom-1 left-4 right-4 rounded-lg bg-background/90 p-2 backdrop-blur">
                <p className="text-xs text-center sm:text-sm font-medium">
                &quot;Thought long hours were key but 10 minutes of focused mapping supercharged my notes.&quot;
                </p>
              </div></div>
                <div className = "mt-4">
                <SignInButton text="Start Mapping" /></div>
                  
          
        </section>

        {/* Problem Agitation */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The Problem with Passive Learning
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                YouTube videos are designed for passive consumption, not active reflection.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold">Watching videos passively:</h3>
                <ul className="mt-2 space-y-4">
                <li className="flex gap-2">
                  <Headphones className="h-5 w-5 text-red-500 shrink-0" />
                  <span>Half-listening nukes your focus and creativity.</span>
                </li>
                <li className="flex gap-2">
                  <FastForward className="h-5 w-5 text-red-500 shrink-0" />
                  <span>Brain learns to skim and toss since everything is either fake or junk</span>
                </li>
                <li className="flex gap-2">
                  <VolumeX className="h-5 w-5 text-red-500 shrink-0" />
                  <span>Can’t sit in silence anymore? Must be the recycled hot-takes noisily playing in the background!</span>
                </li><li className="flex gap-2">
                  <SearchSlash className="h-5 w-5 text-red-500 shrink-0" />
                  <span>You’re not curious—you’re just bored and afraid of quiet.</span>
                </li>
                <li className="flex gap-2">
                  <MoonStar className="h-5 w-5 text-red-500 shrink-0" />
                  <span>Sleep? Not when your brain’s binge-watching war crimes or emotional dramas at 1 AM.</span>
                </li>
                <li className="flex gap-2">
                  <BookX className="h-5 w-5 text-red-500 shrink-0" />
                  <span>Feels like you are learning something but actually ends in burnout... </span>
                </li>

                </ul>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="italic">
                    The average YouTube deep dive takes hours, but how much do you actually retain?
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold">Converting videos into mind maps:</h3>
                <ul className="mt-2 space-y-4">
                <li className="flex gap-2">
                  <BrainCog className="h-5 w-5 text-green-600 shrink-0" />
                  <span>Mindmapping forces focused listening. No more doomscrolling your creativity away.</span>
                </li>
                <li className="flex gap-2">
                  <Filter className="h-5 w-5 text-green-600 shrink-0" />
                  <span>AI filters the junk. You get the signal, not the noise. </span>
                </li> 
                <li className="flex gap-2">
                  <MicOff className="h-5 w-5 text-green-600 shrink-0" />
                  <span>Silence is golden. Mindmaps let you pause, think, write and reflect.</span>
                </li>
                <li className="flex gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600 shrink-0" />
                  <span>Mindmapping rewires boredom and mental atrophy into insight.</span>
                </li>
                <li className="flex gap-2">
                  <BedDouble className="h-5 w-5 text-green-600 shrink-0" />
                  <span>No dopamine dumps at midnight—just a clean, visual mindmap you can review tomorrow with a fresh brain.</span>
                </li>
                <li className="flex gap-2">
                  <PenTool className="h-5 w-5 text-green-600 shrink-0" />
                  <span>You’re not just watching, you’re building and iterating. </span>
                </li>
                </ul>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="italic">
                    Use the assistant in the sidebar to search for videos, skip the algorithm and research while the video plays, and get the most out of your time by taking notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    The Pareto Principle of Learning
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    A typical crash course might include 64 hours of lectures, 1372 comments and discussions, and 2 hours of
                    actual insights...
                  </p>
                  <p className="max-w-[600px] font-bold md:text-xl">
                    But the truth? We only use 20% of what we watch.
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Capture only the essentials (no information overload)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Use AI to structure insights effortlessly</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Turn videos into a tool for deeper understanding</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                
                <SignInButton text="Free Forever" />
         
                  
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative h-[350px] w-full max-w-[550px] overflow-hidden rounded-lg border bg-background shadow-xl">
                  <Image
                    src="/pie-chart-80-svgrepo-com.svg"
                    width={1200}
                    height={700}
                    alt="How MindMapAI transforms YouTube videos into interactive mind maps"
                    className="object-contain mt-12 ml-32"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Active Learning
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to transform passive watching into active learning and balance consumption with creation.
              </p>
            </div>
            {/* <Tabs defaultValue="extract" className="mx-auto max-w-5xl py-12">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="extract">Extract</TabsTrigger>
                <TabsTrigger value="organize">Organize</TabsTrigger>
                <TabsTrigger value="retain">Enrich</TabsTrigger>
              </TabsList>
              <TabsContent value="extract" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold">AI-Powered Insight Extraction</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Instant Key Point Detection</p>
                          <p className="text-sm text-muted-foreground">
                            Our AI identifies and extracts the most important concepts, facts, quotes and practical tips from long text and YouTube videos.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Visual Learning</p>
                          <p className="text-sm text-muted-foreground">
                            Go beyond summary boxes with our intutively designed mindmaps. 
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Clean Dopamine</p>
                          <p className="text-sm text-muted-foreground">
                          Turns out, the secret isn’t just in watching less — it’s in consuming with intent and creating with purpose.
                          </p>
                        </div>
                        
                      </li>
                    </ul>
                  </div>
                  <div className="mx-auto flex items-center justify-center">
                    <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg border bg-background shadow-xl">
                      <Image
                        src="/magnifying-glass-for-search-svgrepo-com.svg"
                        width={800}
                        height={600}
                        alt="AI extracting key points from a YouTube video"
                        className="object-contain ml-24 mt-10"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="organize" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold">AI Assistant</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Search the web, find youtube video links and more!</p>
                          <p className="text-sm text-muted-foreground">
                            Skip the algorithm altogether and get the most relevant content for your research.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Editable Mindmaps</p>
                          <p className="text-sm text-muted-foreground">
                            AI helps you get started, you can then enrich your mind maps to extend learning with the research assistant.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Minimize doomscrolling</p>
                          <p className="text-sm text-muted-foreground">
                            Focus on the underlying message instead of getting lost in the comment sections.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mx-auto flex items-center justify-center">
                    <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg border bg-background shadow-xl">
                      <Image
                        src="/chatbot-svgrepo-com.svg"
                        width={800}
                        height={600}
                        alt="Visual organization of concepts in a mind map"
                        className="object-contain ml-28 mt-14"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="retain" className="mt-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold">Knowledge Retention Tools</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Turn Your Youtube History into an Asset</p>
                          <p className="text-sm text-muted-foreground">
                          This approach worked for me — maybe it could be useful for one of you out there.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Reflection</p>
                          <p className="text-sm text-muted-foreground">
                            Quickly access past mind maps to reinforce visual learning and promote iteration.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Multi-Language Support</p>
                          <p className="text-sm text-muted-foreground">
                            Powered by GPT-4o
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mx-auto flex items-center justify-center">
                    <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg border bg-background shadow-xl">
                      <Image
                        src="/clock-svgrepo-com.svg"
                        width={800}
                        height={600}
                        alt="Knowledge retention tools and flashcards"
                        className="object-contain ml-24 mt-10"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs> */}
          </div>
        </section>

        {/* About Us */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Was stuck in the scroll cycle until I discovered this small change. Now, each video feels like an opportunity, keeping me engaged and  not just background noise. 
                  </p>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Over time, something just started feeling different—not a huge transformation, but a sense of control over my time.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <span className="text-lg font-bold text-primary-foreground">AG</span>
                  </div>
                  <div>
                    <p className="font-medium">Agney Nalapat</p>
                    <p className="text-sm text-muted-foreground">Founder</p>
                  </div>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative h-[350px] w-full max-w-[400px] overflow-hidden rounded-lg border bg-background shadow-xl">
                  <Image
                    src="/zen-svgrepo-com(2).svg"
                    width={800}
                    height={700}
                    alt="MindMapAI founder working on the platform"
                    className="object-contain mt-8 ml-16"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 ">
            <div className="mx-auto flex max-w-[58rem] flex-col gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              
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
                  <div className='mt-4' >
                  <SignInButton text="Get Started" /></div>
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
                    
                    <a href="https://payhip.com/order?link=KSaXZ" target="_blank" rel="noopener noreferrer">
                      <Button className="mt-6 w-full"> Buy Now! </Button>
                    </a>
                    
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
                <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Unlock the “No API Key” Method</span>
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Build on VC subsisdized AI</span>
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>The Jevons Paradox, Reimagined</span>
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Abstraction vs Control</span>
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Freemium Cloud Infrastructure </span>
                </li>
                <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Exploits and Tricks </span>
                </li>
              </ul>
                  {/* <Button className="mt-6 w-full">Buy Now</Button> */}
                  <p className="mt-2 text-xs text-center text-muted-foreground">Its always the same old story</p>
                </CardContent>
                </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to know about y2map.
              </p>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-12">
              {[
                  {
                      "q": "How accurate is the AI at extracting key points?",
                      "a": "Didn't expect the AI to be this accurate, but ChatGPT-4o is powerful... It’s surprising how much time I save with accurate key point extractions from videos. If you’ve ever felt overwhelmed by video content, this might change things for you."
                  },
                  {
                      "q": "Can I use MindMapAI with any YouTube video?",
                      "a": "It works with any YouTube video that has enabled captions."
                  },
                  {
                      "q": "How long does it take to generate a mind map?",
                      "a": "We're continuously improving speed, but currently, most videos process in under 90 seconds. You can always watch the video while it converts!"
                  },
                  {
                      "q": "Is there a limit to how many videos I can process?",
                      "a": "We've all felt the pinch of limits, but we're planning ways to help you do more. We've made it easier for paid users to explore more videos without hitting limits."
                  },
                  {
                      "q": "Additional Tips",
                      "a": "Try a short video first. You'll see the magic in under a minute."
                  },
                  {
                      "q": "Final Thought",
                      "a": "Turns out, productivity is just a mind map away."
                  }
              ].map((faq, i) => (
                <Card key={i} className="border bg-background">
                  <CardHeader>
                    <CardTitle className="text-xl">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform How You Learn?
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of learners who are already getting more from their content.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              
                  
                  <SignInButton text="Turn Your Youtube History into an Asset" />
         
                
              </div>
              <p className="text-sm text-muted-foreground pt-2">No credit card required!</p>
            </div>
          </div>
        </section>
      </main>
      

      
    </div>
  )
}
