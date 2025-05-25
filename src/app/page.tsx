"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, FileText, Zap } from "lucide-react"
import { useState } from "react";

const Card = ({ title, description, Icon }: { title: string, description: string, Icon: React.ElementType }) => {
  return (
    <div className="flex flex-col gap-5 px-12 justify-center items-center bg-white rounded-3xl shadow-sm h-[300px] w-[500px] sm:w-full mx-auto hover:shadow-xl hover:scale-[1.01] transition-all duration-500">
      <div className="flex flex-col justify-center items-center gap-5">
        <Icon className="h-[55px] w-[55px] bg-emerald-100 rounded-lg p-3 text-emerald-800 xl:h-12 xl:w-12 xl:p-3" />
        <h1 className="text-3xl xl:text-2xl font-semibold">{title}</h1>
        <h2 className="text-2xl xl:text-xl text-gray-600">{description}</h2>
      </div>
    </div>
  );
};

const ListItem = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <div className="flex flex-row justify-center items-start gap-4">
      <div className="text-4xl text-emerald-800 font-semibold bg-emerald-100 rounded-lg w-[60px] h-[60px] flex items-center justify-center">{number}</div>
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



const DemoComponent = () => {
  const sampleInvoices = [
    { id: 1, name: "A", amount: "$1,250.00", date: "Mar 15, 2024" },
    { id: 2, name: "B", amount: "$3,750.00", date: "Mar 16, 2024" },
    { id: 3, name: "C", amount: "$2,500.00", date: "Mar 17, 2024" },
  ];

  const [isDropped, setIsDropped] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const InvoiceShowcase = ({ invoiceID }: { invoiceID: string | null }) => {
    return(
      <div className="flex flex-col items-start gap-10 border-2 border-gray-200 rounded-xl h-full w-full shadow-md">
        <div className="flex flex-row justify-between w-full bg-gray-100">
          <div className="flex items-center justify-between p-3 rounded-t-lg border-b border-gray-200">
            <h1 className="text-md font-bold">Invoice {invoiceID}</h1>
          </div>
          <button onClick={() => setIsDropped(false)} className="flex items-center justify-center m-3 p-1 aspect-square rounded-md bg-gray-300 text-lg font-bold text-gray-100 hover:bg-emerald-950 hover:shadow-xl transition-all duration-200">x</button>
        </div>
      </div>
    )
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDropped(true);
    const invoiceId = e.dataTransfer.getData("invoice");
    setSelectedInvoice(invoiceId)
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Allow dropping
  };

  return (
    <div className="flex flex-col items-start gap-10 border-2 border-gray-200 rounded-xl h-[800px] w-[800px] shadow-md">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-t-lg border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-500">billow</div>
        </div>
        <div className="bg-white p-6 rounded-b-lg border-x border-b border-gray-200">
          <div className="flex flex-row gap-6">
            <div onDrop={handleDrop} onDragOver={handleDragOver} className={`relative w-1/2 p-4 h-[550px] border border-dashed border-gray-300 rounded-lg bg-gray-50 flex flex-col gap-4 justify-center items-center ${isDragging ? "opacity-50" : "opacity-100"}`}>
              {isDragging && isDropped && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-gray-500 text-xl text-md">Drop invoice here</div>
              )}
              
              {isDropped ? (
                <InvoiceShowcase invoiceID={selectedInvoice}/>
              ) : (
                <p className="text-gray-500 text-xl">Drop invoice here</p>
              )}
            </div>
            <div className="w-1/2  p-4 rounded-lg">
              <div className="flex flex-col gap-4 bg-gray-50 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Extracted Details</h3>
                  <span className="text-sm text-emerald-600">100% Complete</span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Invoice Number</span>
                      <span className="font-medium">INV-2024-0123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">PO Number</span>
                      <span className="font-medium">PO-2024-456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Invoice Date</span>
                      <span className="font-medium">March 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Due Date</span>
                      <span className="font-medium">April 14, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Supplier</span>
                      <span className="font-medium">Tech Solutions Inc.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Amount</span>
                      <span className="font-medium">$7,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tax</span>
                      <span className="font-medium">$375.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Amount</span>
                      <span className="font-medium font-semibold">$7,875.00</span>
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-emerald-100 rounded-full">
                  <div className="h-1 bg-emerald-500 rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row mx-[150px] gap-3 p-5">
          {sampleInvoices.map((invoice) => (
            <div
              key={invoice.id}
              draggable
              onDragStart={(e) => {
                setIsDragging(true);
                e.dataTransfer.setData("invoice", invoice.name);
              }}
              onDragEnd={() => {
                setIsDragging(false);
              }}
              className={`flex flex-col items-start p-3 max-w-[200px] mx-auto bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-shadow`}
            >
              <div className="flex flex-col justify-between items-center">
                <span className="font-medium text-gray-900">Invoice {invoice.name}</span>
                <span className="text-emerald-600 font-semibold">{invoice.amount}</span>
              </div>
              <span className="text-sm text-gray-500">{invoice.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-50 flex border-b-[1px] border-gray-200 bg-white">
        <div className="flex flex-row justify-between items-center mx-[500px] w-full px-8 py-6 gap-4">
          <div className="flex flex-row justify-center items-center font-satoshi rounded-2xl">
            <h2 className="text-3xl text-emerald-900 font-bold">billow</h2>
          </div>
          <nav className="flex flex-row gap-10 text-gray-600">
            <Link href="#features" className="text-xl font-semibold">Features</Link>
            <Link href="#how-it-works" className="text-xl font-semibold">How it Works</Link>
            <Link href="#demo" className="text-xl font-semibold">Demo</Link>
            <Link href="#contact" className="text-xl font-semibold">Contact</Link>
          </nav>
          <div className="flex flex-row justify-center items-center font-satoshi">
            <button className="px-btnX py-btnY rounded-md bg-emerald-900 text-xl font-bold text-white hover:bg-emerald-950 hover:shadow-xl transition-all duration-300">Contact Us</button>
          </div>
        </div>
      </header>

      <main>
        <div className="flex flex-col">
          <section className="flex flex-row gap-20 items-start py-40 px-5 ms-[500px]">
            <div className="flex flex-col items-start w-[700px]">
              <h1 className="text-8xl font-bold text-gray-900 mb-10">
                Invoice processing to accelerate your cash flow
              </h1>
              <h2 className="text-2xl text-gray-600 mb-10">
                Join the growing number of businesses using Billow to extract invoice data automatically, streamline finance operations, eliminate manual work, and accelerate cash flow with AI-powered precision.
              </h2>

              <div className="flex flex-row justify-center items-center gap-4">
                <button className="px-btnX py-btnY rounded-md bg-emerald-900 text-xl font-bold text-white hover:bg-emerald-950 hover:shadow-xl transition-all duration-300">Get Started</button>
              </div>
            </div>
            <DemoComponent />
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
              <h1 className="text-4xl font-bold mb-5">How <span className="text-emerald-900 font-bold font-satoshi">billow</span> works</h1>
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

          <section id="demo" className="flex flex-col w-full bg-emerald-900 p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-20">
              <h1 className="text-4xl text-white font-bold mb-5">See the action.</h1>
              <h2 className="text-xl text-white">Watch how a tedious task is turned into a seamless experience.</h2>
            </div>

            <video src="/video.mp4" className="rounded-xl border-2 border-gray-200 w-[800px] h-[450px] bg-slate-200 mb-10 mx-auto" autoPlay muted loop />
          
            <button className="px-btnX py-btnY rounded-2xl bg-white text-xl text-emerald-950 hover:bg-gray-100 mx-auto">Schedule a demo</button>
          </section>

        </div>


        <section id="contact" className="flex flex-col w-full p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-16">
              <h1 className="text-4xl text-gray-900 font-bold mb-5">Get in touch.</h1>
              <h2 className="text-xl text-gray-600">Have questions about <span className="text-emerald-950 font-bold font-satoshi">billow</span>? Our team is here to help.</h2>
            </div>
            
            <button className="px-btnX py-btnY rounded-2xl bg-emerald-900 text-xl text-white hover:bg-emerald-950 mx-auto">Contact us</button>
        </section>

      <footer className="flex flex-col w-full bg-gray-100 p-10">
        <div className="flex flex-row justify-between items-start max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl text-emerald-950 font-bold font-satoshi">billow</h2>
            <p className="text-gray-600 max-w-[300px]">Automate invoice processing with AI precision. Save time, eliminate errors, and streamline your finance operations.</p>
          </div>

          <div className="flex flex-row gap-20">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Features</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Pricing</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Demo</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Integration</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-gray-600 hover:text-emerald-950">About</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Blog</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Careers</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Privacy</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Terms</Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-950">Security</Link>
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

