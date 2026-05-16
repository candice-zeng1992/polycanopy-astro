import { ArrowRight, ArrowDown } from 'lucide-react';

// 🌟 告诉 Astro 页面：需要传翻译字典函数 t 和当前语言 lang 进来
interface HeroProps {
  t: (key: string) => string;
  lang: string;
}

export default function Hero({ t, lang }: HeroProps) {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col items-center justify-center px-4 overflow-hidden">
      
      {/* ================= 底层：背景图与 0.83 高端深色蒙版 ================= */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://img.polycanopy.com/2025/07/Polycanopy-Premium-Outdoor-Canopy-Solutions.jpg"
          alt={t('imageAlt')} 
          title={t('imageTitle')} 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(24, 78, 119, 0.83)' }}
        ></div>
      </div>

      {/* ================= 顶层：核心内容 (完美适配中英 LTR 与阿语 RTL) ================= */}
      <div className="relative z-10 max-w-4xl mx-auto mt-20 text-white flex flex-col ltr:text-center rtl:text-right ltr:items-center rtl:items-end w-full">
        
        {/* 核心大标题 */}
        <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold mb-6 leading-tight drop-shadow-lg text-white">
          {t('titlePrefix')}
          <span className="text-[#A5D6A7]">{t('titleHighlight')}</span> 
          <br className="hidden md:inline" />
          {t('titleSuffix')}
        </h1>
        
        {/* 副标题 */}
        <h2 className="text-xl md:text-2xl font-medium mb-8 drop-shadow-md text-white w-full">
          {t('subtitle')}
        </h2>
        
        {/* 描述长文本 */}
        <p className="text-lg mb-10 max-w-3xl leading-relaxed drop-shadow-md text-gray-100 w-full">
          {t('desc')}
        </p>
        
        {/* 核心询盘转化按钮：普通的 <a> 标签在 Astro 里性能拉满 */}
        <a 
          href={`/${lang}/products`} 
          aria-label={t('btnAriaLabel')} 
          className="inline-flex items-center gap-2 bg-[#12b886] hover:bg-[#15b085] text-white px-8 py-4 rounded font-bold text-lg transition-colors duration-300 shadow-lg"
        >
          <span>{t('btnText')}</span>
          {/* 🌟 核心修复：删除了双引号和大括号包裹，直接传递数字 20，让图标回归精致 */}
          <span className="transform rtl:rotate-180 flex items-center">
            <ArrowRight size={20} />
          </span>
        </a>
        
        {/* 底部跳动的引导下箭头 */}
        {/* 🌟 核心修复：直接传递数字 40，彻底终结白色巨无霸箭头 */}
        <div className="mt-16 flex justify-center text-white animate-bounce w-full ltr:justify-center rtl:justify-center">
          <ArrowDown size={40} />
        </div>
        
      </div>
    </section>
  );
}