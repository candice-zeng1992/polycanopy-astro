import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface HeaderProps {
  t: (key: string) => string;
  lang: string;
  currentPath?: string; 
}

export default function Header({ t, lang, currentPath = '' }: HeaderProps) {
  
  // 动态提取路径段
  const pathParts = currentPath.split('/').filter(Boolean);
  
  // ==================== 🌟 智能多语言核心路由引擎 ====================
  const getLanguageLink = (targetLang: string) => {
    if (!currentPath || currentPath === '/' || currentPath === `/${lang}` || currentPath === `/${lang}/`) {
      return `/${targetLang}/`;
    }

    // 1. 完美兼顾你的单数 product 详情页原位跳转逻辑
    const isSingleProductPage = pathParts.includes('products') && pathParts.length > 2;
    if (isSingleProductPage) {
      const currentSlug = pathParts[pathParts.length - 1];
      return `/${targetLang}/products/${currentSlug}/`;
    }

    // 2. 完美兼顾你的复数 blog 文章详情页原位跳转逻辑
    const isBlogDetailPage = pathParts.includes('blog') && pathParts.length > 2;
    if (isBlogDetailPage) {
      const currentSlug = pathParts[pathParts.length - 1];
      return `/${targetLang}/blog/${currentSlug}/`;
    }

    // 3. 🌟 工业级升级：通过正则匹配路径开头的任何 /xx 两字母语种目录，将其精确清洗替换
    const cleanPath = currentPath.replace(/^\/([a-z]{2})/, '');
    
    // 拼装出完美的同页面语境链接
    return `/${targetLang}${cleanPath === '' ? '/' : cleanPath}`;
  };
  
  // 🌟 智能高亮判断函数
  const getLinkClass = (path: string) => {
    const normalizedCurrent = currentPath.replace(/\/$/, ""); 
    const normalizedTarget = path.replace(/\/$/, "");

    let isMatch = false;
    if (normalizedTarget === `/${lang}`) {
      isMatch = normalizedCurrent === `/${lang}`;
    } else {
      if (normalizedTarget.endsWith('/products') && (normalizedCurrent.includes('/products/') || normalizedCurrent.includes('/products'))) {
        isMatch = true;
      } else {
        isMatch = normalizedCurrent.startsWith(normalizedTarget);
      }
    }

    return isMatch 
      ? "text-white font-medium text-lg border-b-2 border-[#2bc4ea] pb-1"
      : "text-white hover:text-gray-200 font-medium text-lg transition-colors pb-1 border-b-2 border-transparent hover:border-white";
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo 链接 */}
          <a href={`/${lang}/`} className="flex-shrink-0" aria-label={t('homeAlt') || "Go to homepage"}>
            <img 
              src="https://img.polycanopy.com/2025/06/cropped-polycanopy-150x150.png" 
              alt={t('logoAlt') || "PolyCanopy Logo"} 
              className="h-12 md:h-16 w-auto object-contain" 
            />
          </a>

          {/* 主导航栏 */}
          <nav className="hidden md:flex items-center gap-8" aria-label={t('navLabel')}>
            <a href={`/${lang}/`} className={getLinkClass(`/${lang}/`)} aria-label={t('homeAlt')}>{t('home')}</a>
            <a href={`/${lang}/products/`} className={getLinkClass(`/${lang}/products`)} aria-label={t('products')}>{t('products')}</a>
            <a href={`/${lang}/service/`} className={getLinkClass(`/${lang}/service`)} aria-label={t('service')}>{t('service')}</a>
            <a href={`/${lang}/blog/`} className={getLinkClass(`/${lang}/blog`)} aria-label={t('blog')}>{t('blog')}</a>
            <a href={`/${lang}/contact/`} className={getLinkClass(`/${lang}/contact`)} aria-label={t('contact')}>{t('contact')}</a>
          </nav>

          {/* 右侧多语言切换下拉浮层区（扩容至11国完全体） */}
          <div className="relative group h-full flex items-center" aria-label={t('langSwitcher')}>
            <div className="flex items-center gap-1 text-white cursor-pointer hover:text-gray-200 py-4">
              <Globe size={20} className="mx-1" />
              <span className="font-medium text-lg">{t('language')}</span>
              <ChevronDown size={16} />
            </div>

            {/* 下拉浮层面板 - 增加 max-h 和滚动轴，防止 11 国太长溢出屏幕 */}
            <div className="absolute top-[70px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ltr:right-0 rtl:left-0">
              <div className="bg-white shadow-2xl rounded-xl w-44 max-h-[70vh] overflow-y-auto flex flex-col border border-slate-100 py-1.5 scrollbar-thin">
                <a href={getLanguageLink('en')} aria-label={t('switchEn')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇺🇸 English</a>
                <a href={getLanguageLink('zh')} aria-label={t('switchZh')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇨🇳 简体中文</a>
                <a href={getLanguageLink('ar')} aria-label={t('switchAr')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors ltr:flex-row rtl:flex-row-reverse">🇸🇦 العربية</a>
                <a href={getLanguageLink('de')} aria-label={t('switchDe')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇩🇪 Deutsch</a>
                <a href={getLanguageLink('es')} aria-label={t('switchEs')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇪🇸 Español</a>
                <a href={getLanguageLink('pt')} aria-label={t('switchPt')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇵🇹 Português</a>
                <a href={getLanguageLink('fr')} aria-label={t('switchFr')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇫🇷 Français</a>
                <a href={getLanguageLink('ru')} aria-label={t('switchRu')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇷🇺 Русский</a>
                <a href={getLanguageLink('ja')} aria-label={t('switchJa')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇯🇵 日本語</a>
                <a href={getLanguageLink('it')} aria-label={t('switchIt')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇮🇹 Italiano</a>
                <a href={getLanguageLink('ko')} aria-label={t('switchKo')} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-slate-800 font-medium text-sm transition-colors">🇰🇷 한국어</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}