import Image from "next/image";
import Link from "next/link";
import { CreditCard, FileText, Zap } from "lucide-react"


const Card = ({ title, description, Icon }: { title: string, description: string, Icon: React.ElementType }) => {
  return (
    <div className="flex flex-col gap-5 px-12 justify-center items-center bg-white rounded-3xl shadow-sm h-[300px] w-[500px] sm:w-full mx-auto hover:shadow-xl hover:scale-[1.01] transition-all duration-500">
      <div className="flex flex-col justify-center items-center gap-5">
        <Icon className="h-[55px] w-[55px] bg-blue-100 rounded-lg p-3 text-blue-400 xl:h-12 xl:w-12 xl:p-3" />
        <h1 className="text-3xl xl:text-2xl font-semibold">{title}</h1>
        <h2 className="text-2xl xl:text-xl text-gray-600">{description}</h2>
      </div>
    </div>
  );
};

const ListItem = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <div className="flex flex-row justify-center items-start gap-4">
      <div className="text-4xl text-blue-400 font-semibold bg-blue-100 rounded-lg w-[60px] h-[60px] flex items-center justify-center">{number}</div>
      <div className="flex flex-col items-start gap-3">
        <h2 className="text-2xl text-gray-900 font-semibold">{title}</h2>
        <h2 className="text-xl text-gray-600">{description}</h2>
      </div>
    </div>
  );
};

const Section = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      <h2 className="text-2xl text-gray-600">{description}</h2>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-50 flex border-b-[1px] border-gray-200 bg-white">
        <div className="flex flex-row justify-center items-center font-satoshi border-2 border-gray-200 rounded-2xl">
          <h2 className="text-3xl text-blue-500 font-bold">billow</h2>
        </div>
        <div className="flex flex-row justify-center items-center w-full max-w-7xl mx-auto px-8 py-6 gap-8">
          <nav className="flex flex-row gap-10 text-gray-600">
            <Link href="#features" className="text-xl font-semibold">Features</Link>
            <Link href="#how-it-works" className="text-xl font-semibold">How it Works</Link>
            <Link href="#demo" className="text-xl font-semibold">Demo</Link>
            <Link href="#contact" className="text-xl font-semibold">Contact</Link>
          </nav>


        </div>
      </header>

      <main>
        <div className="flex flex-col">
          <section className="flex flex-col text-center mx-[50px] py-40">
            <h1 className="text-7xl font-bold text-gray-900 mb-10">
              Invoice processing,
              <span className="block text-7xl font-bold text-blue-500 mt-1">reimagined.</span>
            </h1>
            <h2 className="text-2xl text-gray-600 mb-10">
              Billow automates your invoice processing with AI precision. Save time, reduce errors, and get paid faster.
            </h2>
            <div className="flex flex-row justify-center items-center gap-4">
              <button className="px-btnX py-btnY rounded-2xl bg-blue-500 text-xl font-bold text-white hover:bg-blue-600 hover:shadow-xl transition-all duration-300">Get Started</button>
              <button className="px-btnX py-btnY rounded-2xl border-2 border-gray-300 text-xl bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300">Watch Demo</button>
            </div>
          </section>

          <section id="features" className="flex flex-col w-full bg-gray-100 p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-20">
              <h1 className="text-4xl font-bold mb-5">Simplify your invoice workflow</h1>
              <h2 className="text-2xl text-gray-600">Billow handles the entire invoice lifecycle, from receipt to payment, so you can focus on growing your business.</h2>
            </div>

            <div className="flex flex-col max-w-7xl xl:flex-row gap-10 justify-center items-center text-center rounded-xl mx-auto">
              <Card 
                Icon = {FileText}
                title="Intelligent Capture" 
                description="Our AI extracts data from invoices with 99.9% accuracy, regardless of format." 
              />
              <Card 
                Icon = {Zap}
                title="Automated Processing" 
                description="Streamline approvals, coding, and payments with customizable workflows." 
                />
              <Card 
                Icon = {CreditCard}
                title="Seamless Integration" 
                description="Connect with your accounting software and payment systems for end-to-end automation." 
                />
            </div>
          </section>

          <section id="how-it-works" className="flex flex-col w-full p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-20">
              <h1 className="text-4xl font-bold mb-5">How <span className="text-blue-500 font-bold font-satoshi">billow</span> works</h1>
              <h2 className="text-2xl text-gray-600">Billow automates your invoice processing with AI precision. Save time, reduce errors, and get paid faster.</h2>
            </div>
            <div className="flex rounded-xl justify-center items-center">
              <div className="flex flex-col rounded-xl justify-start items-start gap-12">
                <ListItem 
                  number="1" 
                  title="Upload your invoice" 
                  description="Email, drag-and-drop, or automatically import invoices from any source." /> 
                
                <ListItem 
                  number="2" 
                  title="AI-powered processing" 
                  description="Our AI extracts all relevant data and routes invoices through your custom approval workflow." /> 
                
                <ListItem 
                  number="3" 
                  title="Export your data" 
                  description="Get your clean, structured data ready to use." /> 
              </div>
            </div>
          </section>

          <section id="demo" className="flex flex-col w-full bg-blue-500 p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-20">
              <h1 className="text-4xl text-white font-bold mb-5">See the action.</h1>
              <h2 className="text-xl text-white">Watch how a tedious task is turned into a seamless experience.</h2>
            </div>

            <video src="/video.mp4" className="rounded-xl border-2 border-gray-200 w-[800px] h-[450px] bg-slate-200 mb-10 mx-auto" autoPlay muted loop />
          
            <button className="px-btnX py-btnY rounded-2xl bg-white text-xl text-blue-500 hover:bg-gray-100 mx-auto">Schedule a demo</button>
          </section>

        </div>


        <section id="contact" className="flex flex-col w-full p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-16">
              <h1 className="text-4xl text-gray-900 font-bold mb-5">Get in touch.</h1>
              <h2 className="text-xl text-gray-600">Have questions about <span className="text-blue-500 font-bold font-satoshi">billow</span>? Our team is here to help.</h2>
            </div>
            
            <button className="px-btnX py-btnY rounded-2xl bg-blue-500 text-xl text-white hover:bg-blue-600 mx-auto">Contact us</button>
        </section>

      <footer className="flex flex-col w-full bg-gray-100 p-10">
        <div className="flex flex-row justify-between items-start max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl text-blue-500 font-bold font-satoshi">billow</h2>
            <p className="text-gray-600 max-w-[300px]">Automate invoice processing with AI precision. Save time, eliminate errors, and streamline your finance operations.</p>
          </div>

          <div className="flex flex-row gap-20">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">Features</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Pricing</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Demo</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Integration</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">About</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Blog</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Careers</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-gray-600 hover:text-blue-500">Privacy</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Terms</Link>
                <Link href="#" className="text-gray-600 hover:text-blue-500">Security</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mx-auto">© 2025 Billow. All rights reserved.</p>
        </div>
      </footer>
      </main>

      
    </div>
  );
}

