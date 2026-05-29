// src/components/FloatingWidget.tsx
import { useState, useEffect, useRef } from "react";

interface FloatingWidgetProps {
  // 🌟 从 Astro 侧传入的 11 国母语多语言翻译文本
  dict: {
    wechatHover?: string;
    copied?: string;
    waMessage?: string;
    emailSubject?: string;
    emailBody1?: string;
    emailBody2?: string;
    toastMsg?: string;
    ariaCloseCta?: string;
    ariaToggle?: string;
    ariaEmail?: string;
    ariaWechat?: string;
    ariaMessenger?: string;
    ariaWhatsapp?: string;
  };
}

export default function FloatingWidget({ dict }: FloatingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  // 多语言兜底
  const textWechatHover = dict.wechatHover || "Copy WeChat ID";
  const textCopied = dict.copied || "Copied!";
  const [wechatText, setWechatText] = useState(textWechatHover);
  const widgetRef = useRef<HTMLDivElement>(null);

  // 初始化时更新微信提示文本（防止语种切换滞后）
  useEffect(() => {
    setWechatText(textWechatHover);
  }, [textWechatHover]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const copyWeChat = () => {
    const id = "woaizengmei"; // 保持 Candice 专属微信 ID
    navigator.clipboard.writeText(id).then(() => {
      setShowToast(true);
      setWechatText(textCopied); 
      setTimeout(() => setShowToast(false), 2200);
      setTimeout(() => setWechatText(textWechatHover), 2200);
    });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentUrl = window.location.href; 
    const msg = encodeURIComponent(`${dict.waMessage || "Hi, I am interested in your polycarbonate canopy from: "}${currentUrl}`);
    window.open(`https://wa.me/8613420298302?text=${msg}`, "_blank");
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const currentUrl = window.location.href;
    const subject = encodeURIComponent(dict.emailSubject || "Inquiry about Polycarbonate Canopy");
    const body = encodeURIComponent(`${dict.emailBody1 || "Hello, I visited your website and am interested in your products. URL: "}${currentUrl}${dict.emailBody2 || ""}`);
    window.location.href = `mailto:sales@polycanopy.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .chaty-widget { position: fixed; bottom: 16px; right: 16px; z-index: 99998; display: flex; flex-direction: column-reverse; align-items: center; gap: 10px; }
        @media (min-width: 640px) { .chaty-widget { bottom: 24px; right: 24px; gap: 12px; } }
        
        .chaty-toggle { width: 48px; height: 48px; border-radius: 50%; border: none; outline: none; cursor: pointer; background: #184e77; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(24, 78, 119, 0.3); position: relative; z-index: 10; transition: transform 0.2s ease; }
        @media (min-width: 640px) { .chaty-toggle { width: 56px; height: 56px; } }
        .chaty-toggle:hover { transform: scale(1.1); }
        .chaty-toggle:active { transform: scale(0.95); }
        
        .chaty-toggle svg { width: 22px; height: 22px; }
        .chaty-ch svg { width: 20px; height: 20px; }
        @media (min-width: 640px) { 
          .chaty-toggle svg { width: 24px; height: 24px; }
          .chaty-ch svg { width: 22px; height: 22px; }
        }

        .chaty-toggle .ico-open, .chaty-toggle .ico-close { position: absolute; transition: opacity 0.3s, transform 0.35s; display: flex; align-items: center; justify-content: center; }
        .chaty-toggle .ico-close { opacity: 0; transform: rotate(-90deg) scale(0.4); }
        .chaty-toggle.open .ico-open { opacity: 0; transform: rotate(90deg) scale(0.4); }
        .chaty-toggle.open .ico-close { opacity: 1; transform: rotate(0deg) scale(1); }
        
        .chaty-widget [dir="rtl"] .ch-tip { right: auto; left: calc(100% + 15px); }
        .chaty-widget [dir="rtl"] .ch-tip::after { left: auto; right: 100%; border-left-color: transparent; border-right-color: #011627; }

        .chaty-channels { display: flex; flex-direction: column-reverse; align-items: center; gap: 10px; pointer-events: none; }
        @media (min-width: 640px) { .chaty-channels { gap: 12px; } }
        .chaty-channels.show { pointer-events: auto; }
        
        .chaty-ch { width: 40px; height: 40px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; text-decoration: none; position: relative; box-shadow: 0 3px 12px rgba(0,0,0,0.18); opacity: 0; transform: scale(0.5) translateY(30px); transition: 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55); cursor: pointer; }
        @media (min-width: 640px) { .chaty-ch { width: 48px; height: 48px; } }
        .chaty-channels.show .chaty-ch { opacity: 1; transform: scale(1) translateY(0); }
        .chaty-ch:active { transform: scale(0.9) !important; }
        
        .chaty-ch .ch-tip { position: absolute; right: calc(100% + 15px); top: 50%; transform: translateY(-50%); background: #011627; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; white-space: nowrap; opacity: 0; visibility: hidden; transition: opacity 0.2s; z-index: 99999; }
        .chaty-ch .ch-tip::after { content: ''; position: absolute; left: 100%; top: 50%; transform: translateY(-50%); border: 5px solid transparent; border-left-color: #011627; }
        .chaty-ch:hover .ch-tip { opacity: 1; visibility: visible; }
        
        .ch-whatsapp { background: #25D366; } .ch-messenger { background: #0084FF; } .ch-wechat { background: #07C160; } .ch-email-main { background: #EA4335; }
        
        .chaty-toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ffffff; color: #011627; font-weight: 700; padding: 16px 32px; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); z-index: 999999; opacity: 0; pointer-events: none; transition: 0.3s; }
        .chaty-toast.visible { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      `}} />

      <div className="chaty-widget" ref={widgetRef}>
        <button 
          className={`chaty-toggle ${isOpen ? "open" : ""}`} 
          onClick={handleToggle} 
          type="button"
          aria-label={isOpen ? dict.ariaCloseCta || "Close chat menu" : dict.ariaToggle || "Contact us"}
        >
          <span className="ico-open"><svg viewBox="0 0 24 24" fill="white"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg></span>
          <span className="ico-close"><svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>
        </button>

        <div className={`chaty-channels ${isOpen ? "show" : ""}`}>
          {/* 🌟 邮箱渠道：统一缩减为单一官方销售邮箱 sales@polycanopy.com */}
          <a href="#" onClick={handleEmail} className="chaty-ch ch-email-main" aria-label={dict.ariaEmail || "Send Email"}>
            <span className="ch-tip">sales@polycanopy.com</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
          </a>

          {/* 微信渠道 */}
          <button className="chaty-ch ch-wechat" onClick={copyWeChat} type="button" aria-label={dict.ariaWechat || "Copy WeChat ID"}>
            <span className="ch-tip">{wechatText}</span>
            <svg viewBox="0 0 24 24" fill="white"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66l-.7 2.1 2.45-1.23c.93.26 1.93.42 2.97.42.17 0 .33 0 .5-.02a5.56 5.56 0 01-.5-2.08C9.5 10.47 12.46 8 16 8c.34 0 .68.02 1 .07C16.44 5.56 13.23 4 9.5 4zM7 9a1 1 0 110-2 1 1 0 010 2zm5 0a1 1 0 110-2 1 1 0 010 2zm10 4.85c0-2.72-2.69-4.85-6-4.85s-6 2.13-6 4.85 2.69 4.85 6 4.85c.74 0 .1.45-.1 2.1-.29l1.95.98-.56-1.68C21.13 16.77 22 15.4 22 13.85zM14 14a.75.75 0 110-1.5.75.75 0 010 1.5zm4 0a.75.75 0 110-1.5.75.75 0 010 1.5z"/></svg>
          </button>

          {/* Messenger 渠道 */}
          <a href="https://m.me/candicezeng1992" target="_blank" rel="noopener noreferrer" className="chaty-ch ch-messenger" aria-label={dict.ariaMessenger || "Contact on Messenger"}>
            <span className="ch-tip">Messenger</span>
            <svg viewBox="0 0 24 24" fill="white"><path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.34 5.53 3.47 7.36V22l3.18-1.75c1.06.31 2.18.47 3.35.47 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.09 13.1l-2.78-2.96-5.4 2.96 5.94-6.31 2.88 2.96 5.29-2.96-5.93 6.31z"/></svg>
          </a>

          {/* WhatsApp 渠道 */}
          <a href="#" onClick={handleWhatsApp} className="chaty-ch ch-whatsapp" aria-label={dict.ariaWhatsapp || "Contact on WhatsApp"}>
            <span className="ch-tip">WhatsApp</span>
            <svg viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a3.8 3.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>

      <div className={`chaty-toast ${showToast ? "visible" : ""}`} role="status">✅ {dict.toastMsg || "Copied!"}</div>
    </>
  );
}