
import React, { useState } from 'react';
import RevealAnimation from './RevealAnimation';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <RevealAnimation>
              <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">Get In Touch</span>
            </RevealAnimation>
            
            <RevealAnimation delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Have Questions?</h2>
            </RevealAnimation>
            
            <RevealAnimation delay={200}>
              <p className="text-muted-foreground mb-8">
                Interested in our initiatives or want to collaborate? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
              </p>
            </RevealAnimation>
            
            <RevealAnimation delay={300}>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-3 p-3 rounded-full bg-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1 (123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 p-3 rounded-full bg-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-muted-foreground">contact@ecell.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 p-3 rounded-full bg-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Location</h3>
                    <p className="text-muted-foreground">123 University Ave, Campus Building</p>
                  </div>
                </div>
              </div>
            </RevealAnimation>
          </div>
          
          <RevealAnimation delay={400}>
            <div className="bg-white dark:bg-black rounded-lg p-6 md:p-8 shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-md border bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 resize-none"
                      placeholder="Your message"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending || isSent}
                      className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md transition-all duration-200 hover:shadow-lg hover:transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {isSending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : isSent ? (
                        <>
                          <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Message Sent
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
