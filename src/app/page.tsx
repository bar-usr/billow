"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, FileText, Zap } from "lucide-react"
import { useState, useEffect } from "react";

const Card = ({ title, description, Icon }: { title: string, description: string, Icon: React.ElementType }) => {
  return (
    <div className="flex flex-col gap-5 px-12 justify-center items-center bg-background-secondary rounded-3xl shadow-sm h-[300px] w-[500px] sm:w-full mx-auto hover:shadow-xl hover:scale-[1.01] transition-all duration-500">
      <div className="flex flex-col justify-center items-center gap-5">
        <Icon className="h-[55px] w-[55px] bg-primary rounded-lg p-3 text-primary-dark xl:h-12 xl:w-12 xl:p-3" />
        <h1 className="text-3xl xl:text-2xl font-semibold">{title}</h1>
        <h2 className="text-2xl xl:text-xl text-text-secondary">{description}</h2>
      </div>
    </div>
  );
};

const ListItem = ({ number, title, description }: { number: string, title: string, description: string }) => {
  return (
    <div className="flex flex-row justify-center items-start gap-4">
      <div className="text-4xl text-primary-dark font-semibold bg-primary rounded-lg w-[60px] h-[60px] flex items-center justify-center">{number}</div>
      <div className="flex flex-col items-start gap-3">
        <h2 className="text-2xl text-text-primary font-semibold">{title}</h2>
        <h2 className="text-xl text-text-secondary">{description}</h2>
      </div>
    </div>
  );
};

const Section = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      <h2 className="text-2xl text-text-secondary">{description}</h2>
    </div>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="px-4 py-2 rounded bg-primary text-background hover:bg-primary-hover transition-theme"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

const InvoiceData = ({invoiceID}: {invoiceID: string | null}) => {
  return(
    <div className="flex flex-col items-start rounded-b-xl h-full w-full shadow-md">
      <div className="flex flex-row justify-between w-full bg-background h-full">
        {invoiceID && <img src={`/invoice${invoiceID}.jpg`} alt={`invoice ${invoiceID}`} className="w-full h-full object-contain" />}
      </div>
    </div>
  )
}

const DemoComponent = () => {
  const sampleInvoices = [
    { id: 1, name: "A", amount: "$192.81", tax: "$19.28", total: "$212.09", issued_date: "09/06/2012", due_date: "-", PO: "-", InvoiceNumber: "61356291", Supplier: "Chapman, Kim and Green" },
    { id: 2, name: "B", amount: "$3,750.00", tax: "$1,125.00", total: "$4,875.00", issued_date: "Mar 16, 2024", due_date: "Apr 15, 2024", PO: "PO-2024-457", InvoiceNumber: "INV-2024-0124", Supplier: "Tech Solutions Inc." },
    { id: 3, name: "C", amount: "$2,500.00", tax: "$750.00", total: "$3,250.00", issued_date: "Mar 17, 2024", due_date: "Apr 16, 2024", PO: "PO-2024-458", InvoiceNumber: "INV-2024-0125", Supplier: "Tech Solutions Inc." },
  ];

  const [isDropped, setIsDropped] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const selectedInvoiceData = sampleInvoices.find(invoice => invoice.name === selectedInvoice);

  const InvoiceShowcase = ({ invoiceID }: { invoiceID: string | null }) => {
    return(
      <div className="flex flex-col items-start gap-0 h-full w-full shadow-md">
        <div className="flex flex-row justify-between w-full rounded-t-lg bg-background">
          <div className="flex items-center justify-between p-3 rounded-t-lg border-b border-border">
            <h1 className="text-md font-bold">Invoice {invoiceID}</h1>
          </div>
          <button onClick={() => setIsDropped(false)} className="flex items-center justify-center m-3 p-1 aspect-square rounded-md bg-border-dark text-lg font-bold text-background-light hover:bg-primary-hover hover:shadow-xl transition-all duration-200">x</button>
        </div>
        <div className="flex-1 w-full rounded-b-lg overflow-hidden">
          <InvoiceData invoiceID={invoiceID}/>
        </div>
      </div>
    )
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const invoiceId = e.dataTransfer.getData("invoice");
    setSelectedInvoice(invoiceId);
    setLoadingProgress(0);
    setIsDropped(true);
    
    // Start loading animation
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 20);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="absolute top-[200px] right-[150px] flex flex-col items-start gap-10 h-[700px] w-[1000px]">
      <div className="flex flex-col w-full rounded-2xl h-full">
        <div className="p-6 rounded-2xl backdrop-blur-md bg-[rgba(var(--background-rgb),0.3)] h-full">
          <div className="flex flex-row gap-6 h-full">
            <div 
              onDrop={handleDrop} 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative w-1/2 h-full ${isDropped ? 'p-0 transition-all duration-700': `border-2 border-dashed border-primary ${isDragOver ? 'bg-[rgba(var(--background-rgb),0.7)]' : 'bg-[rgba(var(--background-rgb),0.4)]'}`} rounded-lg flex flex-col gap-4 justify-center items-center ${isDragging && isDropped? "opacity-50" : "opacity-100"} transition-colors duration-200`}>
              {isDragging && isDropped && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-primary text-xl font-medium">Drop invoice here</div>
              )}
              
              {isDropped ? (
                <div className="w-full h-full transform scale-97 animate-grow transition-transform duration-300">
                  <InvoiceShowcase invoiceID={selectedInvoice}/>
                </div>
              ) : (
                <div className="text-primary text-xl font-medium h-full w-full flex justify-center items-center">Drop invoice here</div>
              )}
            </div>
            <div className="flex flex-col w-1/2 rounded-lg">
              <div className="flex flex-col gap-4 bg-[rgba(var(--background-rgb),0.4)] p-4 mb-5 rounded-xl backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-primary">Extracted Details</h3>
                  <span className="text-sm text-primary-lightest font-medium">{loadingProgress}% Complete</span>
                </div>
                <div className="bg-background/80 p-4 rounded-lg shadow-sm backdrop-blur-sm">
                  <div className="flex flex-col gap-3 h-[280px] justify-center">
                    {loadingProgress === 100 ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">Invoice Number</span>
                          <span className="font-medium text-primary">{selectedInvoiceData?.InvoiceNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">PO Number</span>
                          <span className="font-medium text-primary">{selectedInvoiceData?.PO}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">Invoice Date</span>
                          <span className="font-medium text-primary">{selectedInvoiceData?.issued_date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">Due Date</span>
                          <span className="font-medium text-primary">{selectedInvoiceData?.due_date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">Supplier</span>
                          <span className="font-medium text-primary">{selectedInvoiceData?.Supplier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">Amount</span>
                          <span className="font-medium text-primary">{selectedInvoiceData?.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">Tax</span>
                          <span className="font-medium text-primary">{selectedInvoiceData?.tax}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-primary-dark">Total Amount</span>
                          <span className="font-medium font-semibold text-primary">{selectedInvoiceData?.total}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-center items-center h-[280px] text-primary-dark font-medium">
                        Processing invoice...
                      </div>
                    )}
                  </div>
                </div>
                <div className="h-1 bg-[rgba(var(--primary-light-rgb),0.5)] rounded-full">
                  <div 
                    className={`h-1 bg-primary rounded-full ${loadingProgress === 0 ? '' : 'transition-all duration-200'}`}
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-0 p-4">
                <div className="flex flex-row gap-3 p-5">
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
                      className="flex flex-col items-start p-3 max-w-[200px] mx-auto bg-background/80 backdrop-blur-sm border border-[rgba(var(--primary-light-rgb),0.5)] rounded-lg cursor-move hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col justify-between items-center">
                        <span className="font-medium text-primary">Invoice {invoice.name}</span>
                        <span className="text-primary-lightest font-semibold">{invoice.amount}</span>
                      </div>
                      <span className="text-sm text-primary-dark">{invoice.issued_date}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row justify-center text-primary-dark text-sm font-medium">Drag these</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-50 flex bg-background">
        <div className="flex flex-row justify-between items-center mx-[500px] w-full px-8 py-6 gap-4">
          <div className="flex flex-row justify-center items-center font-satoshi rounded-2xl">
            <h2 className="text-3xl text-primary font-bold">billow</h2>
          </div>
          <nav className="flex flex-row gap-10 text-text-secondary">
            <Link href="#features" className="text-xl font-semibold">Features</Link>
            <Link href="#how-it-works" className="text-xl font-semibold">How it Works</Link>
            <Link href="#demo" className="text-xl font-semibold">Demo</Link>
            <Link href="#contact" className="text-xl font-semibold">Contact</Link>
          </nav>
          <div className="flex flex-row justify-center items-center font-satoshi">
            <ThemeToggle />
          </div>
          
        </div>
      </header>

      <main>
        <div className="flex flex-col">
          <div className="flex flex-col h-screen banner-bg">
            <div className="flex flex-row gap-20 items-start py-60 px-5 ms-[500px]">
              <div className="flex flex-col items-start w-[700px]">
                <h1 className="text-8xl font-bold text-text-primary mb-10 transition-theme">
                  Invoice processing to accelerate your cash flow
                </h1>
                <h2 className="text-2xl text-text-secondary mb-10 transition-theme">
                  Join the growing number of businesses using Billow to extract invoice data automatically, streamline finance operations, eliminate manual work, and accelerate cash flow with AI‑powered precision.
                </h2>

                <div className="flex flex-row justify-center items-center gap-4">
                  <button className="px-btnX py-btnY rounded-md bg-primary text-xl font-bold text-background hover:bg-primary-hover hover:shadow-xl transition-all duration-300">Get Started</button>
                </div>
              </div>
              <DemoComponent/>
            </div>
          </div>

          <section id="features" className="flex flex-col w-full bg-background-light p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-20">
              <h1 className="text-4xl font-bold mb-5">Simplify your invoice workflow</h1>
              <h2 className="text-2xl text-text-secondary">Billow handles the entire invoice lifecycle, from receipt to payment, so you can focus on growing your business.</h2>
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
              <h1 className="text-4xl font-bold mb-5">How <span className="text-primary font-bold font-satoshi">billow</span> works</h1>
              <h2 className="text-2xl text-text-secondary">Billow automates your invoice processing with AI precision. Save time, reduce errors, and get paid faster.</h2>
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

          <section id="demo" className="flex flex-col w-full banner-bg bg-top-right dark:bg-top-left p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-20">
              <h1 className="text-4xl text-text-primary font-bold mb-5 ">See the action.</h1>
              <h2 className="text-xl text-text-secondary">Watch how a tedious task is turned into a seamless experience.</h2>
            </div>

            <video src="/video.mp4" className="rounded-xl border-2 border-border w-[800px] h-[450px] bg-slate-200 mb-10 mx-auto" autoPlay muted loop />
          
            <button className="px-btnX py-btnY rounded-2xl bg-primary text-xl text-background hover:bg-primary-hover mx-auto">Schedule a demo</button>
          </section>

        </div>


        <section id="contact" className="flex flex-col w-full p-10 py-32">
            <div className="flex flex-col justify-center items-center text-center mb-16">
              <h1 className="text-4xl text-text-primary font-bold mb-5">Get in touch.</h1>
              <h2 className="text-xl text-text-secondary">Have questions about <span className="text-primary-hover font-bold font-satoshi">billow</span>? Our team is here to help.</h2>
            </div>
            
            <button className="px-btnX py-btnY rounded-2xl bg-primary text-xl text-background hover:bg-primary-hover mx-auto">Contact us</button>
        </section>

      <footer className="flex flex-col w-full bg-background-light p-10">
        <div className="flex flex-row justify-between items-start max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl text-primary-hover font-bold font-satoshi">billow</h2>
            <p className="text-text-secondary max-w-[300px]">Automate invoice processing with AI precision. Save time, eliminate errors, and streamline your finance operations.</p>
          </div>

          <div className="flex flex-row gap-20">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Features</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Pricing</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Demo</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Integration</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-text-secondary hover:text-primary-hover">About</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Blog</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Careers</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Contact</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <div className="flex flex-col gap-2">
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Privacy</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Terms</Link>
                <Link href="#" className="text-text-secondary hover:text-primary-hover">Security</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center max-w-7xl mx-auto w-full mt-16 pt-8 border-t border-border">
          <p className="text-text-secondary mx-auto">© 2025 Billow. All rights reserved.</p>
        </div>
      </footer>
      </main>

      
    </div>
  );
}

