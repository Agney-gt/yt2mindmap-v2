
import Image from "next/image"
import { BrainCog,Filter,MicOff,BedDouble,PenTool, Check, CheckCircle, Headphones, FastForward, VolumeX, SearchSlash, MoonStar, BookX, Lightbulb, XCircle } from "lucide-react"
import SignInButton from "@/components/signInButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import PricingPage from "./pricing/page"
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
                  src="/mindmap+.webp"
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
                  <span>Sleep? Not when your brain’s binge-watching war crimes or emotionally charged narratives at 1 AM.</span>
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
        <section className="flex flex-col justify-center items-center w-full py-12 md:py-24 lg:py-32  bg-gradient-to-b from-background to-muted">
        
          
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    The Pareto Principle of Learning
                  </h2>
                  
                 <p className="flex items-center justify-center mt-4 max-w-[600px]  md:text-xl text-muted-foreground">
                    We only use 20% of what we watch...
                  </p>
                </div>
                <ul className="mt-4 rounded-lg border bg-background p-6 space-y-2">
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
                    <span>Save time while staying informed. </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Dramatic delivery stresses the mind, reduces clarity. </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Background Noise makes key points forgettable.  </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Sensational overload blocks clear decision-making. </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Works best with news, podcasts, documentaries and presentations. </span>
                  </li>
                </ul>
                
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                
                <SignInButton text="Free Forever" />
         
                  
                
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
                  From endless YouTube noise to my own dynamic journal, my video history transformed into insights I actually use. After building and using this app, my morning routines became clutter free! Less scrolling, more structured thinking, and complete control over my time while still staying upto date with the latest shenanigans of my favourite creators. All with a peaceful classical music score playing in the background... or bettery yet, in the stillness of silence.                  </p>
                  
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <Image
                    src="/Comparison.webp"
                    width={900}
                    height={630}
                    alt="MindMapAI founder working on the platform"
                    className="object-contain mt-8 md:ml-20"
                  />
          <div className="container px-4 md:px-6">
          
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold">Our Mindmaps</h3>
                <ul className="mt-2 space-y-4">
                <li className="flex gap-2">
                <Check color="green" className='h-5 w-5' />
                  <span>Clearly organized around actionable insights and real-world relevance.</span>
                </li>
                <li className="flex gap-2">
                <Check color="green" className='h-5 w-5' />
                  <span>Uses clear points, including quotes, practical tips, problems, solutions, and facts.</span>
                </li>
                <li className="flex gap-2">
                <Check color="green" className='h-5 w-5' />
                  <span>Minimizes mental strain by using concise language and structured points.</span>
                </li><li className="flex gap-2">
                  <Check color="green" className='h-5 w-5' />
                  <span>Integrates key points into visual mind maps, aiding memory retention.</span>
                </li>
                
                <li className="flex gap-2">
                <Check color="green" className='h-5 w-5' />
                  <span>Active critical thinking and reflection prompts with counterpoints, and trends. </span>
                </li>
                <li className="flex gap-2">
                <Check color="green" className='h-5 w-5' />
                  <span>	Designed for quick scanning, with emphasis on key phrases and visual cues. </span>
                </li>
                <li className="flex gap-2">
                <XCircle className="h-5 w-5" color='red' />
                  <span>Editor and Copilot available for all users.</span>
                </li>
                </ul>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="italic">
                  Breaks down complex topics into digestible parts with minimal loss in depth.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold">Competitors Mindmaps</h3>
                <ul className="mt-2 space-y-4">
                <li className="flex gap-2">
                  <XCircle className="h-5 w-5" color='red' />
                  <span>Loosely structured around thematic segments without clear actionable connections.</span>
                </li>
                <li className="flex gap-2">
                <XCircle className="h-5 w-5" color='red' />
                  <span>Text-heavy and verbose, Overwhelms users with dense, unstructured information.. </span>
                </li> 
                <li className="flex gap-2">
                <XCircle className="h-5 w-5" color='red' />
                  <span>Focuses on content coverage, often at the expense of practical takeaways.</span>
                </li>
                <li className="flex gap-2">
                <XCircle className="h-5 w-5" color='red' />
                  <span>Uses linear text boxes that are hard to remember and require zoom and scrolls.</span>
                </li>
                
                <li className="flex gap-2">
                <XCircle className="h-5 w-5" color='red' />
                  <span>Passive reading with limited prompts for reflection or deeper thought. </span>
                </li>
                <li className="flex gap-2">
                <XCircle className="h-5 w-5" color='red' />
                  <span>Lot of fluff and cumbersome clutter, lacking quick-scan features and prominent highlights. </span>
                </li>
                <li className="flex gap-2">
                <XCircle className="h-5 w-5" color='red' />
                  <span>Editor and Copilot locked behind paywall if available</span>
                </li>
                </ul>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="italic">
                  Struggles to simplify without oversimplifying, often leading to superficial understanding. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Pricing */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <PricingPage/>
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
        "q": "How to convert YouTube video to mind map?",
        "a": "Listen attentively, pause frequently, capture key ideas, and structure them into a mind map. Mind mapping turns passive watching into active learning by forcing focus and reflection."
    },
    {
        "q": "Can ChatGPT generate a mind map?",
        "a": "Yes, ChatGPT can draft a structured outline that serves as a foundation for a mind map, helping you organize key concepts and connections."
    },
    {
        "q": "What is mind mapping YouTube?",
        "a": "It’s a method of extracting and organizing insights from YouTube videos to avoid mindless consumption and instead create a clear, structured summary."
    },
    {
        "q": "Can GPT-4 create mind maps?",
        "a": "GPT-4 can help by generating structured outlines and suggesting themes, making the process of mind mapping more efficient and insightful."
    },
    {
        "q": "Is Brain Mapping a real thing?",
        "a": "Yes, in neuroscience, brain mapping involves studying brain functions, but mind mapping is more about visually organizing thoughts and ideas."
    },
    {
        "q": "What is mind mapping best source of?",
        "a": "Clarity. It helps you distill scattered thoughts into coherent structures, making it easier to remember and review insights."
    },
    {
        "q": "How to generate a mind map?",
        "a": "Start with a central idea, branch out with related topics, and add finer details as twigs. Keep it simple to maintain clarity."
    },
    {
        "q": "What is the AI tool to analyze YouTube videos?",
        "a": "ChatGPT, paired with video analysis tools, can summarize content and help organize insights into mind maps."
    },
    {
        "q": "How to get ChatGPT to make a mind map?",
        "a": "Provide a topic or video summary, and ChatGPT will draft a structured outline, helping you create a clear and insightful mind map."
    },
    {
        "q": "What is the best app for making mind maps?",
        "a": "Y2MAP offers more in-depth mindmaps focussing on key points over summary generation."
    },
    {
        "q": "Does Google have a MindMap tool?",
        "a": "Yes, Google Jamboard can be used for mind mapping, but it’s basic compared to dedicated mind mapping apps."
    }
]
.map((faq, i) => (
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
        <a
              href="/blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex text-l text-center justify-center cursor-pointer text-blue-500 hover:underline"
            >
              Want to learn more? Check out our blog!
            </a>       
        {/* CTA */}
        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform How You Learn?
              </h2>
              
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
              
                  
                  <SignInButton text="Turn Your Watch History into an Asset!" />
         
                
              </div>
              <p className="text-sm text-muted-foreground pt-2">No credit card required!</p>
            </div>
          </div>
        </section>
      </main>
      

      
    </div>
  )
}
