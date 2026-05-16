// src/components/Footer.tsx
import { useState } from 'react';
import { Upload, ArrowUp } from 'lucide-react';

interface FooterProps {
  t: (key: string, subKey?: string, tertiaryKey?: string) => string;
  lang: string;
}

export default function Footer({ t, lang }: FooterProps) {

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productOptions = [
    { value: 'window canopy', key: 'window' },
    { value: 'door canopy', key: 'door' },
    { value: 'car port', key: 'carport' },
    { value: 'dome canopy', key: 'dome' },
    { value: 'sun room', key: 'sunroom' },
    { value: 'customize service', key: 'customize' },
    { value: 'wholesales query', key: 'wholesales' }
  ];

  return (
    <footer className="bg-[#184e77] text-white block w-full relative z-30">
      
      {/* ================= 1. 询盘表单区 (Ask for a Quote) ================= */}
      <div className="py-16 px-4 border-b border-white/10 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold uppercase tracking-wide mb-3">{t('quoteTitle')}</h3>
          <p className="text-gray-200 text-[15px] max-w-2xl mx-auto">{t('quoteDesc')}</p>
        </div>

        <form 
          className="space-y-6 max-w-[1000px] mx-auto" 
          aria-label={t('form', 'ariaLabel')}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{t('form', 'name')}</label>
              <input type="text" required className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{t('form', 'phone')}</label>
              <input type="tel" required className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{t('form', 'email')}</label>
              <input type="email" required className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{t('form', 'country')}</label>
              <input type="text" placeholder={t('form', 'countryPlaceholder')} className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#12b886]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">{t('form', 'products')}</label>
              <div className="relative">
                <select className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886] appearance-none cursor-pointer">
                  <option value="">{t('form', 'selectPlaceholder')}</option>
                  {productOptions.map((opt) => (
                    <option key={opt.key} value={opt.value}>
                      {t('form', 'options', opt.key)}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">{t('form', 'message')}</label>
            <textarea rows={4} placeholder={t('form', 'messagePlaceholder')} className="w-full bg-white text-gray-800 rounded px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#12b886]"></textarea>
          </div>

          {/* 附件上传 */}
          <div className="flex flex-col gap-2">
            <div className="relative border-2 border-dashed border-white/20 hover:border-white/40 transition-colors rounded p-6 flex flex-col items-center justify-center bg-white/5 cursor-pointer">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload size={24} className="mb-2 text-gray-300" />
              <span className="text-sm text-gray-200">Upload technical drawing / project layout</span>
            </div>
          </div>

          <div className="text-center">
            {/* 🌟 修复：按钮背景与悬停全部锁定高对比度翡翠绿 */}
            <button type="submit" className="bg-[#12b886] hover:bg-[#0ca678] text-white font-bold px-12 py-3.5 rounded text-[16px] uppercase transition-colors duration-300 shadow-md cursor-pointer">
              {t('form', 'submit')}
            </button>
          </div>
        </form>
      </div>

      {/* ================= 2. Newsletter 订阅区 ================= */}
      <div className="py-12 px-4 border-b border-white/10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center" aria-label={t('newsletter', 'ariaLabel')}>
          <h4 className="lg:col-span-2 text-[16px] font-semibold leading-relaxed text-gray-100 text-center ltr:lg:text-left rtl:lg:text-right">
            {t('newsletter', 'title')}
          </h4>
          <div className="flex w-full rounded overflow-hidden">
            <input type="email" placeholder={t('newsletter', 'placeholder')} required className="w-full px-4 py-3 bg-white text-gray-800 text-sm focus:outline-none" />
            <button className="bg-[#1b759f] hover:bg-[#168aad] px-6 font-bold text-sm transition-colors flex-shrink-0 cursor-pointer">
              {t('newsletter', 'submit')}
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3. 底部三栏内容矩阵 ================= */}
      <div className="py-16 px-4 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* 第一栏：品牌简述与条款 */}
          <div className="flex flex-col ltr:items-start rtl:items-end">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-[#99d98c]">{t('profile', 'title')}</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{t('profile', 'desc')}</p>
            <a href={`/${lang}/service`} className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded uppercase transition-colors mb-6">
              {t('profile', 'readMore')}
            </a>
            
            <h5 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-200">{t('terms', 'title')}</h5>
            {/* 🌟 修复：将条款链接由原本晦暗的 text-gray-400 提升为明亮的 text-gray-300 */}
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <a href={`/${lang}/privacy-policy`} className="hover:text-white transition-colors">{t('terms', 'privacy')}</a>
              <a href={`/${lang}/return-policy`} className="hover:text-white transition-colors">{t('terms', 'return')}</a>
            </div>
            
            <div className="flex gap-4 mt-6">
              <a 
                href="https://www.facebook.com/Polycanopy" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-gray-300 hover:text-white transition-all flex items-center justify-center w-9 h-9"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 第二栏：联系方式 */}
          <div className="flex flex-col ltr:items-start rtl:items-end">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-[#99d98c]">{t('contact', 'title')}</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <a href="tel:+8676023132009" className="hover:text-white transition-colors">{t('contact', 'tel')}</a>
              </li>
              <li>
                {/* 🌟 修复：调亮前缀对比度 */}
                <span className="text-blue-100 block mb-1">Email:</span>
                <a href="mailto:sales@polycanopy.com" className="hover:text-white transition-colors break-all">sales@polycanopy.com</a>
              </li>
              <li>{t('contact', 'address')}</li>
            </ul>
          </div>

          {/* 第三栏：最新博文探索 */}
          <div className="flex flex-col ltr:items-start rtl:items-end">
            <h4 className="text-lg font-bold uppercase tracking-wider mb-6 text-[#99d98c]">{t('explore', 'title')}</h4>
            <div className="space-y-6 w-full">
              
              <article className="flex gap-4 items-center">
                <img width={64} height={64} src="https://img.polycanopy.com/2026/02/Large-commercial-polycarbonate-canopy-over-building-entrance.jpg" className="w-16 h-16 object-cover rounded flex-shrink-0" alt="3mm Solid Polycarbonate Sheet" />
                <div className="flex flex-col">
                  {/* 🌟 修复：标题高亮色由浅绿微调为具有高辨识度的 brand-green */}
                  <h5 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[#12b886] transition-colors">
                    <a href={`/${lang}/3mm-solid-polycarbonate-sheet-canopy-roofing/`}>{t('explore', 'post1Title')}</a>
                  </h5>
                  {/* 🌟 修复：小标签由 text-gray-400 完美上调为 text-blue-100 */}
                  <span className="text-[11px] text-blue-100 mt-1 uppercase font-bold tracking-wider">{t('explore', 'post1Tag')}</span>
                </div>
              </article>

              <article className="flex gap-4 items-center">
                <img width={64} height={64} src="https://img.polycanopy.com/2025/12/professional-installation-of-a-polycarbonate-canopy-anchoring-system-in-a-high-wind-coastal-area.webp" className="w-16 h-16 object-cover rounded flex-shrink-0" alt="Anchoring Systems for High-Wind Areas" />
                <div className="flex flex-col">
                  <h5 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[#12b886] transition-colors">
                    <a href={`/${lang}/securing-your-structure-a-guide-to-anchoring-systems-for-high-wind-areas/`}>{t('explore', 'post2Title')}</a>
                  </h5>
                  {/* 🌟 修复：小标签由 text-gray-400 完美上调为 text-blue-100 */}
                  <span className="text-[11px] text-blue-100 mt-1 uppercase font-bold tracking-wider">{t('explore', 'post2Tag')}</span>
                </div>
              </article>

            </div>
          </div>

        </div>
      </div>

      {/* ================= 4. 版权与回到顶部区 ================= */}
      <div className="bg-black/20 py-6 px-4">
        {/* 🌟 修复：版权行由 text-gray-400 全面提亮为 text-gray-200 */}
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-sm text-gray-200">
          <p>{t('copyright', '')}</p>
          <a 
            href="#" 
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-3 bg-white/5 hover:bg-[#12b886] text-white hover:text-white rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>

    </footer>
  );
}