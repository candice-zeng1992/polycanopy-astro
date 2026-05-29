declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: any) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

import React, { useState, useEffect, useRef } from 'react';

interface ContactSectionProps {
  dict: any;
}

export default function ContactSection({ dict }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  useEffect(() => {
    const scriptId = 'cloudflare-turnstile-script';
    const siteKey = dict.turnstileSiteKey || '0x4AAAAAACBUDH3G7cEg5mCH';
    
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        if (window.turnstile && turnstileRef.current) {
          window.turnstile.render(turnstileRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              setTurnstileToken(token);
            },
          });
        }
      };
    } else if (window.turnstile && turnstileRef.current) {
      window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          setTurnstileToken(token);
        },
      });
    }
  }, [dict.turnstileSiteKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert(dict.turnstileError || "Please complete security verification.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.append('cf-turnstile-response', turnstileToken);

    try {
      const response = await fetch('https://polycanopy-contact-worker.ninazengconstruction.workers.dev', {
        method: 'POST',
        mode: 'cors', // 🌟 确保跨域请求畅通无阻
        body: formData,
      });

      if (response.ok || response.status === 200) {
        setSubmitStatus('success');
        try {
          e.currentTarget.reset();
          if (window.turnstile) {
            window.turnstile.reset();
          }
        } catch (resetError) {
          console.log("Non-critical clean up skip", resetError);
        }
        setTurnstileToken('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Critical submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 relative">
      {submitStatus === 'success' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 max-w-md w-full rounded-2xl shadow-2xl text-center border border-gray-100 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-[#12b886]/10 rounded-full flex items-center justify-center text-[#12b886] mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h4 className="text-2xl font-extrabold text-gray-900 mb-2">
              {dict.successTitle || "Thank You for Your Inquiry!"}
            </h4>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {dict.successDesc || "Our professional team will analyze your architectural specs and get back to you with a customized quote within 24 hours."}
            </p>
            <button 
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-2.5 bg-[#184e77] hover:bg-[#12b886] text-white font-bold text-sm rounded-lg transition-colors shadow-md"
            >
              {dict.btnClose || "Close Window"}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl sm:text-5xl text-gray-900 leading-tight mb-10">
            {dict.helpPre} <br />
            <span className="font-extrabold text-[#184e77]">{dict.helpHighlight}</span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center text-[#12b886] group-hover:bg-[#12b886] group-hover:text-white transition-colors duration-300 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{dict.phoneTitle}</h3>
                <a href={`tel:${dict.phoneVal}`} className="text-gray-600 hover:text-[#184e77] transition-colors">{dict.phoneVal}</a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#184e77]/10 flex items-center justify-center text-[#184e77] group-hover:bg-[#184e77] group-hover:text-white transition-colors duration-300 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{dict.addressTitle}</h3>
                <p className="text-gray-600">{dict.addressVal}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#12b886]/10 flex items-center justify-center text-[#12b886] group-hover:bg-[#12b886] group-hover:text-white transition-colors duration-300 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{dict.emailTitle}</h3>
                <a href={`mailto:${dict.emailVal}`} className="text-gray-600 hover:text-[#184e77] transition-colors">{dict.emailVal}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative">
          <h3 className="text-2xl text-gray-900 mb-8">
            {dict.formTitlePre} <span className="font-extrabold text-[#184e77]">{dict.formTitleBold}</span>
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact Form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fName}</label>
                <input type="text" name="fullName" placeholder={dict.pName} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fEmail}</label>
                <input type="email" name="email" placeholder={dict.pEmail} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fPhone}</label>
                <input type="tel" name="phone" placeholder={dict.pPhone} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fCompany}</label>
                <input type="text" name="company" placeholder={dict.pCompany} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fWho}</label>
                <input type="text" name="customerType" placeholder={dict.pWho} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fCountry}</label>
                <input type="text" name="country" placeholder={dict.pCountry} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fProductLabel}</label>
              <select name="productInterest" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none text-gray-600 cursor-pointer">
                <option value="Select from list">{dict.optDefault || "Select from list"}</option>
                <option value="window canopy">{dict.optWindow || "Window Canopy"}</option>
                <option value="door canopy">{dict.optDoor || "Door Canopy"}</option>
                <option value="car port">{dict.optCarport || "Carport"}</option>
                <option value="dome">{dict.optDome || "Stargazing Dome"}</option>
                <option value="sun room">{dict.optSunroom || "Sunroom"}</option>
                <option value="customize">{dict.optCustomize || "Customize"}</option>
                <option value="wholesales">{dict.optWholesales || "Wholesales"}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider mb-2 uppercase">{dict.fMessage}</label>
              <textarea name="message" rows={4} placeholder={dict.pMessage} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#12b886]/50 focus:border-[#12b886] transition-all outline-none resize-none"></textarea>
            </div>

            <div className="my-4">
              <div ref={turnstileRef} id="turnstile-container"></div>
            </div>

            {submitStatus === 'error' && (
              <p className="text-sm font-semibold text-red-500 animate-shake">❌ Submission failed. Please try again later.</p>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-4 text-white font-bold rounded-lg shadow-md transition-all duration-300 uppercase tracking-widest text-sm ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#32373c] hover:bg-[#184e77] hover:shadow-lg'}`}
            >
              {isSubmitting ? 'Sending...' : dict.btnSubmit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}