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
import { Upload, ArrowUp } from 'lucide-react';

interface FooterPost {
  slug: string;
  title: string;
  coverImage: string;
}

interface FooterProps {
  dict: any; 
  lang: string;
  latestPosts?: FooterPost[]; 
}

export default function Footer({ dict, lang, latestPosts }: FooterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [fileName, setFileName] = useState(''); 

  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlStatus, setNlStatus] = useState<'idle' | 'success'>('idle');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    const siteKey = dict.turnstileSiteKey || '0x4AAAAAACBUDH3G7cEg5mCH';
    const callbackName = `onloadTurnstileFooter_${Date.now()}`;
    
    (window as any)[callbackName] = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
        });
      }
    };

    const script = document.createElement('script');
    script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=${callbackName}&render=explicit`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if ((window as any)[callbackName]) {
        delete (window as any)[callbackName];
      }
    };
  }, [dict]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productOptions = [
    { value: 'window canopy', dictKey: 'optWindow', fallback: 'Window Canopy' },
    { value: 'door canopy', dictKey: 'optDoor', fallback: 'Door Canopy' },
    { value: 'car port', dictKey: 'optCarport', fallback: 'Carport' },
    { value: 'dome canopy', dictKey: 'optDome', fallback: 'Stargazing Dome' },
    { value: 'sun room', dictKey: 'optSunroom', fallback: 'Sunroom' },
    { value: 'customize service', dictKey: 'optCustomize', fallback: 'Customize' },
    { value: 'wholesales query', dictKey: 'optWholesales', fallback: 'Wholesales' }
  ];

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        mode: 'cors',
        body: formData,
      });

      if (response.ok || response.status === 200) {
        setSubmitStatus('success');
        try {
          e.currentTarget.reset();
          if (window.turnstile) window.turnstile.reset();
        } catch (resetError) {
          console.log("Cleanup skip");
        }
        setTurnstileToken('');
        setFileName(''); 
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) {
      setNlStatus('success');
      e.currentTarget.reset();
      return;
    }
    setNlSubmitting(true);
    setTimeout(() => {
      setNlSubmitting(false);
      setNlStatus('success');
      e.currentTarget.reset();
      setTimeout(() => setNlStatus('idle'), 3000);
    }, 1000);
  };

  const defaultPosts = [
    {
      slug: '3mm-solid-polycarbonate-sheet-canopy-roofing',
      title: lang === 'zh' ? '3mm实心聚碳酸酯板雨棚屋顶安装指南' : lang === 'ar' ? 'دليل تركيب سقف مظلة ألواح البولي كربونيت المصمتة 3 مم' : '3mm Solid Polycarbonate Sheet Canopy Roofing Installation Guide',
      coverImage: 'https://img.polycanopy.com/2026/02/Large-commercial-polycarbonate-canopy-over-building-entrance.jpg'
    },
    {
      slug: 'securing-your-structure-a-guide-to-anchoring-systems-for-high-wind-areas',
      title: lang === 'zh' ? '确保结构稳固：强风地区锚固系统指南' : lang === 'ar' ? 'تأمين الهيكل: دليل أنظمة التثبيت للمناطق ذات الرياح القوية' : 'Securing Your Structure: Anchoring Systems for High-Wind Areas',
      coverImage: 'https://img.polycanopy.com/2025/12/professional-installation-of-a-polycarbonate-canopy-anchoring-system-in-a-high-wind-coastal-area.webp'
    }
  ];

  const currentPosts = latestPosts && latestPosts.length > 0 ? latestPosts : defaultPosts;

  // 🌟 核心改进：计算对齐 11 国静态政策路由的完好 Href 链接
  const privacyHref = lang === 'en' ? '/privacy-policy/' : `/${lang}/privacy-policy/`;
  const returnHref = lang === 'en' ? '/return-policy/' : `/${lang}/return-policy/`;

  return (
    <footer id="footer" className="bg-[#184e77] text-white block w-full relative z-30">
      <div className="py-16 px-4 border-b border-white/10 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold uppercase tracking-wide mb-3">{dict.quoteTitle || 'REQUEST A QUOTE'}</h3>
          <p className="text-gray-200 text-[15px] max-w-2xl mx-auto">{dict.quoteDesc || 'Tell us about your project requirements...'}</p>
        </div>

        <form className="space-y-6 max-w-[1000px] mx-auto" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{dict.formName || 'Full Name'}</label>
              <input type="text" name="fullName" required className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{dict.formPhone || 'Phone Number'}</label>
              <input type="tel" name="phone" required className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{dict.formEmail || 'Email Address'}</label>
              <input type="email" name="email" required className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{dict.formCountry || 'Country'}</label>
              <input type="text" name="country" placeholder={dict.formCountryPlaceholder || 'Where are you from?'} className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{dict.formProducts || 'Intended Product'}</label>
              <div className="relative">
                <select name="productInterest" className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886] appearance-none cursor-pointer">
                  <option value="">{dict.formSelectPlaceholder || 'Select from list'}</option>
                  {productOptions.map((opt) => (
                    <option key={opt.dictKey} value={opt.value}>
                      {dict[opt.dictKey] || opt.fallback}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">{dict.formMessage || 'Project Details'}</label>
            <textarea name="message" rows={4} placeholder={dict.formMessagePlaceholder || 'Please describe your requirements...'} className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]"></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label className="relative border-2 border-dashed border-white/20 hover:border-white/40 transition-colors rounded p-6 flex flex-col items-center justify-center bg-white/5 cursor-pointer group">
              <input 
                type="file" 
                name="attachment" 
                className="hidden" 
                onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
              />
              <Upload size={24} className={`mb-2 transition-colors ${fileName ? 'text-[#99d98c]' : 'text-gray-300 group-hover:text-white'}`} />
              <span className={`text-sm text-center transition-colors ${fileName ? 'text-[#99d98c] font-bold' : 'text-gray-200'}`}>
                {fileName ? fileName : (dict.formUpload || "Upload technical drawing / project layout")}
              </span>
            </label>
          </div>

          <div className="flex justify-center my-4">
            <div ref={turnstileRef} id="footer-turnstile"></div>
          </div>

          <div className="text-center">
            <button type="submit" disabled={isSubmitting || submitStatus === 'success'} className={`font-bold px-12 py-3.5 rounded text-[16px] uppercase transition-colors shadow-md ${submitStatus === 'success' ? 'bg-green-500 text-white cursor-default' : submitStatus === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' : isSubmitting ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#12b886] hover:bg-[#0ca678] text-white'}`}>
              {submitStatus === 'success' ? (dict.btnSuccess || 'Message Sent!') : submitStatus === 'error' ? (dict.btnFailed || 'Failed! Try Again') : isSubmitting ? (dict.btnSending || 'Sending...') : (dict.formSubmit || 'Submit Inquiry')}
            </button>
          </div>
        </form>
      </div>

      <div className="py-12 px-4 border-b border-white/10 max-w-[1200px] mx-auto">
        <form onSubmit={handleNewsletterSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <h4 className="lg:col-span-2 text-[16px] font-semibold leading-relaxed text-gray-100 text-center ltr:lg:text-left rtl:lg:text-right">
            {dict.nlTitle || 'Subscribe to our newsletter'}
          </h4>
          <div className="flex w-full rounded overflow-hidden relative">
            <input type="text" name="internal_routing_code" tabIndex={-1} autoComplete="new-password" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="absolute opacity-0 -left-[9999px] -top-[9999px]" aria-hidden="true" />
            <input type="email" name="subscriberEmail" placeholder={dict.nlPlaceholder || 'Enter your email'} required className="w-full px-4 py-3 bg-white text-gray-800 text-sm focus:outline-none" />
            <button type="submit" disabled={nlSubmitting || nlStatus === 'success'} className={`px-6 font-bold text-sm transition-colors flex-shrink-0 cursor-pointer ${nlStatus === 'success' ? 'bg-green-500 text-white' : 'bg-[#1b759f] hover:bg-[#168aad] text-white'}`}>
              {nlStatus === 'success' ? 'Subscribed!' : nlSubmitting ? '...' : dict.nlSubmit || 'SUBSCRIBE'}
            </button>
          </div>
        </form>
      </div>

      <div className="py-16 px-4 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col ltr:items-start rtl:items-end">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-[#99d98c]">{dict.profileTitle || 'About PolyCanopy'}</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{dict.profileDesc || 'We are a leading manufacturer...'}</p>
            <a href={`/${lang}/service`} className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded uppercase transition-colors mb-6">{dict.profileReadMore || 'READ MORE'}</a>
            
            <h5 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-200">{dict.termsTitle || 'Legal & Terms'}</h5>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              {/* 🌟 完美升级：绑定高兼容多语言自适应政策内链 */}
              <a href={privacyHref} className="hover:text-white transition-colors">{dict.termsPrivacy || 'Privacy Policy'}</a>
              <a href={returnHref} className="hover:text-white transition-colors">{dict.termsReturn || 'Return Policy'}</a>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/Polycanopy" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition-all flex items-center justify-center w-9 h-9"><svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg></a>
            </div>
          </div>

          <div className="flex flex-col ltr:items-start rtl:items-end">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-[#99d98c]">{dict.contactTitle || 'Contact Us'}</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="tel:+8676023132009" className="hover:text-white transition-colors">{dict.contactTel || '+86 13420298302'}</a></li>
              <li><span className="text-blue-100 block mb-1">Email:</span><a href="mailto:sales@polycanopy.com" className="hover:text-white transition-colors break-all">sales@polycanopy.com</a></li>
              <li>{dict.contactAddress || 'Zhongshan, Guangdong Province, China'}</li>
            </ul>
          </div>

          <div className="flex flex-col ltr:items-start rtl:items-end">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-[#99d98c]">{dict.exploreTitle || 'Explore Latest'}</h4>
            <div className="space-y-6 w-full">
              {currentPosts.map((post, idx) => (
                <article key={idx} className="flex gap-4 items-center">
                  <img 
                    width={64} 
                    height={64} 
                    src={post.coverImage} 
                    className="w-16 h-16 object-cover rounded flex-shrink-0" 
                    alt={post.title} 
                  />
                  <div className="flex flex-col">
                    <h5 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[#12b886] transition-colors">
                      <a href={`/${lang}/blog/${post.slug}/`}>
                        {post.title}
                      </a>
                    </h5>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/20 py-6 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-sm text-gray-200">
          <p>{dict.copyright || '© 2026 PolyCanopy. All Rights Reserved.'}</p>
          <a href="#" onClick={scrollToTop} aria-label={dict.backToTop || "Back to top"} className="p-3 bg-white/5 hover:bg-[#12b886] text-white rounded-full transition-all flex items-center justify-center cursor-pointer">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}