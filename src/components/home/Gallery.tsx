import React from 'react';

// 🌟 声明接收外置超级翻译函数 t 和当前语言 lang
interface GalleryProps {
  t: (key: string, subKey?: string) => string;
  lang: string;
}

export default function Gallery({ t, lang }: GalleryProps) {

  // 严格对应原 WP 源码的模块卡片定义与分流路由（补全标准的 products/ 夹层和末尾闭合斜杠）
  const galleryCards = [
    {
      id: 'rooftop',
      img: 'https://img.polycanopy.com/2025/07/modern-rooftop-polycarbonate-canopy-1024x768.jpg',
      href: '/products/terrace-canopy/' 
    },
    {
      id: 'carport',
      img: 'https://img.polycanopy.com/2025/07/residential-carport-covered-parking-metal-frame-1024x768.jpg',
      href: '/products/polycarbonate-carport/' 
    },
    {
      id: 'sunroom',
      img: 'https://img.polycanopy.com/2025/07/arched-sunroom-rural-greenhouse-style-1024x768.jpg',
      href: '/products/retractable-telescopic-sunroom/' 
    }
  ];

  return (
    /* 🌟 还原：使用明显的淡淡蓝绿色渐变背景 */
    <section className="py-20 px-4 bg-gradient-to-tr from-[#d4f0e9] via-[#f4fcf9] to-white">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* ================= 头部文案 ================= */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#333333] mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* ================= 3列 Call to Action 网格 ================= */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          aria-label={t('ariaLabel')}
        >
          {galleryCards.map((card) => {
            // 🌟 干净漂亮地解开三层 JSON 嵌套
            const title = t(card.id, 'title');
            const desc = t(card.id, 'desc');
            const btnText = t(card.id, 'btnText');
            const imageAlt = t(card.id, 'imageAlt');

            // 🌟 核心改进：智能适配 11 国语言的跳转前缀，英文走原生，小语种自动拼装 /ja/products/...
            const localizedHref = lang === 'en' ? card.href : `/${lang}${card.href}`;

            return (
              <article key={card.id} className="relative h-[450px] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
                
                {/* 底层：高清背景大图（带 zoom-in 缩放效果） */}
                <img 
                  src={card.img} 
                  alt={imageAlt} 
                  title={title}    
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out z-0 block"
                  loading="lazy"
                />
                
                {/* 中层：黑色渐变遮罩层（确保文字任何时候都清晰可见） */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>

                {/* 顶层：核心内容区 */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 text-white">
                  
                  {/* 还原原站标签结构：Sunroom 是 h2，其余是 h3 */}
                  {card.id === 'sunroom' ? (
                    <h2 className="text-2xl font-bold mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                      {title}
                    </h2>
                  ) : (
                    <h3 className="text-2xl font-bold mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                      {title}
                    </h3>
                  )}

                  <p className="text-gray-200 text-sm mb-6 max-w-xs leading-relaxed">
                    {desc}
                  </p>

                  {/* 跳转链接按钮 */}
                  <div className="overflow-hidden">
                    <a 
                      href={localizedHref}
                      aria-label={`${btnText} - ${title}`} 
                      className="inline-flex items-center gap-2 bg-[#12b886] hover:bg-[#0ca678] text-white px-5 py-2.5 rounded text-sm font-bold transition-all duration-300 transform translate-y-0"
                    >
                      <span>{btnText}</span>
                      {/* 🌟 RTL 自动适配：阿语状态下方向箭头自动镜像调转 (rtl:rotate-180) */}
                      <svg className="w-4 h-4 fill-current transform rtl:rotate-180" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"></path>
                      </svg>
                    </a>
                  </div>

                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}