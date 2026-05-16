// src/components/Header.tsx
import { Globe, ChevronDown } from 'lucide-react';

// 🌟 1. 告诉 Astro 页面：我们需要传入翻译函数 t 和当前页面正在运行的语言 lang
interface HeaderProps {
  t: (key: string) => string;
  lang: string;
}

export default function Header({ t, lang }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo区域：普通的 <a> 标签，路径完美锚定当前语言的主页 */}
          <a href={`/${lang}/`} className="flex-shrink-0">
            <img 
              src="https://img.polycanopy.com/2025/06/cropped-polycanopy-150x150.png" 
              alt={t('logoAlt')} 
              className="h-12 md:h-16 w-auto object-contain" 
            />
          </a>

          {/* 导航菜单：gap-8 完美支持中英 LTR 与阿语 RTL 的无缝物理反转 */}
          <nav className="hidden md:flex items-center gap-8">
            <a href={`/${lang}/`} className="text-white font-medium text-lg border-b-2 border-[#2bc4ea] pb-1">
              {t('home')}
            </a>
            <a href={`/${lang}/products`} className="text-white hover:text-gray-200 font-medium text-lg transition-colors pb-1 border-b-2 border-transparent hover:border-white">
              {t('products')}
            </a>
            <a href={`/${lang}/service`} className="text-white hover:text-gray-200 font-medium text-lg transition-colors pb-1 border-b-2 border-transparent hover:border-white">
              {t('service')}
            </a>
            <a href={`/${lang}/blog`} className="text-white hover:text-gray-200 font-medium text-lg transition-colors pb-1 border-b-2 border-transparent hover:border-white">
              {t('blog')}
            </a>
            <a href={`/${lang}/contact`} className="text-white hover:text-gray-200 font-medium text-lg transition-colors pb-1 border-b-2 border-transparent hover:border-white">
              {t('contact')}
            </a>
          </nav>

          {/* 语言切换下拉菜单 (Pure CSS group-hover 控制，前台 0KB JS 消耗) */}
          <div className="relative group h-full flex items-center">
            {/* 触发按钮 */}
            <div className="flex items-center gap-1 text-white cursor-pointer hover:text-gray-200 py-4">
              <Globe size={20} className="mx-1" />
              <span className="font-medium text-lg">{t('language')}</span>
              <ChevronDown size={16} />
            </div>

            {/* 下拉菜单盒子：依靠 ltr:right-0 和 rtl:left-0 智能对齐两端 */}
            <div className="absolute top-[70px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ltr:right-0 rtl:left-0">
              <div className="bg-white shadow-lg rounded-md w-40 overflow-hidden flex flex-col">
                {/* 🌟 核心破局：在静态化站点中，点击直接切换至对应的静态语言首页路径，极速秒开 */}
                <a 
                  href="/en/" 
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-800 font-medium transition-colors"
                >
                  🇺🇸 English
                </a>
                <a 
                  href="/zh/" 
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-800 font-medium transition-colors"
                >
                  🇨🇳 简体中文
                </a>
                <a 
                  href="/ar/" 
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-gray-800 font-medium transition-colors justify-between text-right"
                >
                  <span>🇸🇦 العربية</span>
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}