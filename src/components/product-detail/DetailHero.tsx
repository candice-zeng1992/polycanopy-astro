import React from 'react';

interface DetailHeroProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  btnQuoteText?: string; // 🌟 核心改进 1：改为可选参数，防止 Astro 页面编译报错
}

export default function DetailHero({ title, description, imageUrl, imageAlt, btnQuoteText }: DetailHeroProps) {
  return (
    // 🌟 pt-32 (Padding Top) 让内容不被 Header 挡住
    <section className="relative w-full bg-[#184e77] pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 左侧：文字区 */}
        <div className="flex flex-col gap-6 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            {title || "Loading..."}
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed max-w-xl">
            {description || "Description loading..."}
          </p>
          
          {/* 🌟 核心改进 2：条件渲染。只有当存在 btnQuoteText 且不为空时，才渲染整个按钮容器，彻底消灭绿色空方框 */}
          {btnQuoteText && btnQuoteText.trim() !== "" && (
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="#footer" 
                className="px-8 py-4 bg-[#12b886] hover:bg-[#0ca678] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl text-center"
              >
                {btnQuoteText}
              </a>
            </div>
          )}
        </div>

        {/* 右侧：图片区 */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-white/10 rounded-2xl rotate-2 transition-transform group-hover:rotate-3"></div>
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="relative w-full h-auto rounded-xl shadow-2xl object-cover"
            loading="eager"
            onError={(e) => { (e.target as HTMLImageElement).src = '/fallback-image.jpg'; }}
          />
        </div>
      </div>
    </section>
  );
}