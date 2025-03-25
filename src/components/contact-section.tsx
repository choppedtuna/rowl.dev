"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import SectionTitle from './section-title';

export default function ContactSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            hasAnimated.current = true;
          } else if (hasAnimated.current) {
            setIsInView(false);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would send the form data to your backend
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 3000);
  };
  
  const contactLinks = [
    {
      name: 'Roblox',
      icon: '/images/icons/roblox-icon.png',
      href: 'https://www.roblox.com/users/247354738/profile',
      delay: 100
    },
    {
      name: 'LinkedIn',
      icon: '/images/icons/linkedin-icon.png',
      href: 'https://www.linkedin.com/in/benjamin-rowlands/',
      delay: 200
    },
    {
      name: 'Email',
      icon: '/images/icons/email-icon.png',
      href: 'mailto:browlands99@gmail.com',
      delay: 300
    }
  ];
  
  return (
    <section id="contact" className="py-20 pt-24 bg-black" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Get in Touch" 
          subtitle="Interested? Let's chat!"
          centered={true} 
        />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Social Links */}
          <div className={`
            space-y-6
            transform transition-all duration-800 ease-out
            ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
          `}>
            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <div className="space-y-6">
              {contactLinks.map((link, index) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm 
                    hover:shadow-md transition-all duration-300
                    transform transition-all duration-800 ease-out
                    ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
                  `}
                  style={{ transitionDelay: `${link.delay}ms` }}
                >
                  <div className="h-10 w-10 relative flex-shrink-0">
                    <Image
                      src={link.icon}
                      alt={link.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{link.name}</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {link.name === 'Email' ? 'browlands99@gmail.com' : `Connect on ${link.name}`}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`
            transform transition-all duration-800 ease-out
            ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
          `}
          style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              {submitSuccess ? (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md text-green-700 dark:text-green-300 mb-4">
                  Thank you! Your message has been sent successfully.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className={`
                    transform transition-all duration-500 ease-out
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: '300ms' }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 
                      bg-white dark:bg-zinc-800 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                  
                  <div className={`
                    transform transition-all duration-500 ease-out
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: '400ms' }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 
                      bg-white dark:bg-zinc-800 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                  
                  <div className={`
                    transform transition-all duration-500 ease-out
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: '500ms' }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 
                      bg-white dark:bg-zinc-800 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    />
                  </div>
                  
                  <div className={`
                    transform transition-all duration-500 ease-out
                    ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: '600ms' }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`
                        w-full py-3 px-4 rounded-md text-white font-medium
                        bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                        transition-all duration-300 ease-out
                        ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                      `}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 