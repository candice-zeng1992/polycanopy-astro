import React from 'react';

// 🌟 1. 告诉 Astro 页面：我们需要从外部传翻译函数 t 和当前语言 lang 进来
interface ProductRangeProps {
  t: (key: string, subKey?: string) => string;
  lang: string;
}

export default function ProductRange({ t, lang }: ProductRangeProps) {

  const products = [
    {
      id: 'horizontal',
      img: 'https://img.polycanopy.com/2025/07/Horizontal-Beam-Style-Canopy-Installed-Above-Balcony-Entrance.jpg',
      href: '/products/polycarbonate-window-canopy/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="8" y="20" width="48" height="4" fill="#184e77" rx="2"></rect><rect x="12" y="24" width="40" height="2" fill="#52b69a" opacity="0.8"></rect><rect x="10" y="18" width="4" height="20" fill="#1e6091" rx="2"></rect><rect x="50" y="18" width="4" height="20" fill="#1e6091" rx="2"></rect><path d="M8 20 L12 16 L52 16 L56 20" fill="#168aad" opacity="0.6"></path><circle cx="28" cy="22" r="1" fill="#99d98c"></circle><circle cx="36" cy="22" r="1" fill="#99d98c"></circle></svg>
    },
    {
      id: 'suspended',
      img: 'https://img.polycanopy.com/2025/07/Suspended-Steel-Cable-Canopy-for-Modern-Buildings.jpg',
      href: '/products/suspended-polycarbonate-canopy/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="10" y="28" width="44" height="3" fill="#184e77" rx="1.5"></rect><rect x="12" y="31" width="40" height="2" fill="#52b69a" opacity="0.8"></rect><line x1="20" y1="12" x2="20" y2="28" stroke="#1e6091" strokeWidth="2"></line><line x1="32" y1="8" x2="32" y2="28" stroke="#1e6091" strokeWidth="2"></line><line x1="44" y1="12" x2="44" y2="28" stroke="#1e6091" strokeWidth="2"></line><rect x="8" y="8" width="48" height="2" fill="#168aad" rx="1"></rect><circle cx="20" cy="9" r="2" fill="#76c893"></circle><circle cx="32" cy="9" r="2" fill="#76c893"></circle><circle cx="44" cy="9" r="2" fill="#76c893"></circle><circle cx="24" cy="29.5" r="1" fill="#99d98c"></circle><circle cx="40" cy="29.5" r="1" fill="#99d98c"></circle></svg>
    },
    {
      id: 'top_beam',
      img: 'https://img.polycanopy.com/2025/07/Top-Beam-Style-Canopy-for-Villas-and-Large-Terraces.jpg',
      href: '/products/terrace-canopy/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><path d="M8 24 L32 12 L56 24 L52 26 L32 16 L12 26 Z" fill="#184e77"></path><rect x="10" y="24" width="44" height="2" fill="#52b69a"></rect><rect x="12" y="26" width="40" height="2" fill="#76c893" opacity="0.8"></rect><rect x="14" y="26" width="3" height="20" fill="#1e6091" rx="1.5"></rect><rect x="47" y="26" width="3" height="20" fill="#1e6091" rx="1.5"></rect><circle cx="26" cy="20" r="1" fill="#99d98c"></circle><circle cx="38" cy="20" r="1" fill="#99d98c"></circle><path d="M30 12 L34 12 L34 16 L30 16 Z" fill="#168aad"></path></svg>
    },
    {
      id: 'column',
      img: 'https://img.polycanopy.com/2025/07/Column-Support-Canopy-with-Front-and-Back-Posts.jpg',
      href: '/products/terrace-canopy/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="6" y="16" width="52" height="3" fill="#184e77" rx="1.5"></rect><rect x="8" y="19" width="48" height="2" fill="#52b69a" opacity="0.8"></rect><rect x="14" y="19" width="3" height="32" fill="#1e6091" rx="1.5"></rect><rect x="47" y="19" width="3" height="32" fill="#1e6091" rx="1.5"></rect><rect x="12" y="48" width="7" height="4" fill="#168aad" rx="2"></rect><rect x="45" y="48" width="7" height="4" fill="#168aad" rx="2"></rect><path d="M6 16 L10 12 L54 12 L58 16" fill="#1a759f" opacity="0.6"></path><circle cx="24" cy="17.5" r="1" fill="#99d98c"></circle><circle cx="40" cy="17.5" r="1" fill="#99d98c"></circle></svg>
    },
    {
      id: 'inner_corner',
      img: 'https://img.polycanopy.com/2025/07/Inner-Corner-Canopy-for-L-Shaped-Balconies-or-Passageways-1.jpg',
      href: '/products/inside-corner-canopy/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="8" y="20" width="28" height="3" fill="#184e77" rx="1.5"></rect><rect x="33" y="8" width="3" height="28" fill="#184e77" rx="1.5"></rect><rect x="10" y="23" width="24" height="2" fill="#52b69a" opacity="0.8"></rect><rect x="34" y="10" width="2" height="24" fill="#52b69a" opacity="0.8"></rect><path d="M33 20 L30 17 L33 14 L36 17 Z" fill="#168aad"></path><rect x="8" y="18" width="3" height="16" fill="#1e6091" rx="1.5"></rect><rect x="33" y="8" width="16" height="3" fill="#1e6091" rx="1.5"></rect><circle cx="22" cy="21.5" r="1" fill="#99d98c"></circle><circle cx="41" cy="9.5" r="1" fill="#99d98c"></circle></svg>
    },
    {
      id: 'outer_corner',
      img: 'https://img.polycanopy.com/2025/07/Outer-Corner-Canopy-for-Building-Facades.jpg',
      href: '/products/corner-extended-polycarbonate-canopy/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="8" y="20" width="28" height="3" fill="#184e77" rx="1.5"></rect><rect x="33" y="20" width="3" height="28" fill="#184e77" rx="1.5"></rect><rect x="10" y="23" width="24" height="2" fill="#52b69a" opacity="0.8"></rect><rect x="34" y="23" width="2" height="24" fill="#52b69a" opacity="0.8"></rect><path d="M33 20 L36 17 L39 20 L36 23 Z" fill="#168aad"></path><rect x="8" y="18" width="3" height="16" fill="#1e6091" rx="1.5"></rect><rect x="33" y="45" width="16" height="3" fill="#1e6091" rx="1.5"></rect><circle cx="22" cy="21.5" r="1" fill="#99d98c"></circle><circle cx="34.5" cy="35" r="1" fill="#99d98c"></circle></svg>
    },
    {
      id: 'carport',
      img: 'https://img.polycanopy.com/2025/07/Carport-Style-Canopy-for-Vehicle-Protection.jpg',
      href: '/products/polycarbonate-carport/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="6" y="20" width="52" height="4" fill="#184e77" rx="2"></rect><rect x="8" y="24" width="48" height="2" fill="#52b69a" opacity="0.8"></rect><rect x="8" y="24" width="3" height="24" fill="#1e6091" rx="1.5"></rect><rect x="53" y="24" width="3" height="24" fill="#1e6091" rx="1.5"></rect><rect x="28" y="24" width="3" height="24" fill="#1e6091" rx="1.5"></rect><rect x="6" y="45" width="10" height="3" fill="#168aad" rx="1.5"></rect><rect x="48" y="45" width="10" height="3" fill="#168aad" rx="1.5"></rect><rect x="26" y="45" width="7" height="3" fill="#168aad" rx="1.5"></rect><path d="M6 20 L10 16 L54 16 L58 20" fill="#1a759f" opacity="0.6"></path><circle cx="20" cy="22" r="1" fill="#99d98c"></circle><circle cx="44" cy="22" r="1" fill="#99d98c"></circle></svg>
    },
    {
      id: 'door_window',
      img: 'https://img.polycanopy.com/2025/07/Door-and-Window-Awning-Style-for-Entryways.jpg',
      href: '/products/polycarbonate-window-canopy/',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 64 64" fill="none"><rect x="16" y="24" width="32" height="3" fill="#184e77" rx="1.5"></rect><rect x="18" y="27" width="28" height="2" fill="#52b69a" opacity="0.8"></rect><rect x="14" y="22" width="3" height="12" fill="#1e6091" rx="1.5"></rect><rect x="47" y="22" width="3" height="12" fill="#1e6091" rx="1.5"></rect><path d="M16 24 L18 20 L46 20 L48 24" fill="#168aad" opacity="0.6"></path><rect x="20" y="32" width="24" height="16" fill="#76c893" opacity="0.3" rx="2"></rect><rect x="22" y="34" width="8" height="12" fill="#1a759f" opacity="0.4" rx="1"></rect><rect x="34" y="34" width="8" height="12" fill="#1a759f" opacity="0.4" rx="1"></rect><line x1="32" y1="32" x2="32" y2="48" stroke="#168aad" strokeWidth="1"></line><line x1="20" y1="40" x2="44" y2="40" stroke="#168aad" strokeWidth="1"></line><circle cx="28" cy="25.5" r="1" fill="#99d98c"></circle><circle cx="36" cy="25.5" r="1" fill="#99d98c"></circle></svg>
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-[#d4f0e9] via-[#f2faf8] to-white">
      <div className="container mx-auto max-w-[1200px]">
        
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#333333] mb-4">{t('title')}</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t('desc')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {products.map((item) => {
            const title = t(item.id, 'title');
            const desc = t(item.id, 'desc');

            // 🌟 核心改进：完美适配 11 国语言的前缀链接，处理好斜杠
            const localizedHref = lang === 'en' ? item.href : `/${lang}${item.href}`;

            return (
              <article key={item.id} className="flex flex-col group">
                
                <a href={localizedHref} className="w-full rounded-lg overflow-hidden mb-6 block relative">
                  <img 
                    src={item.img} 
                    alt={title} 
                    title={title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out" 
                  />
                </a>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {item.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-[22px] font-bold text-[#184e77] mb-2">
                      <a href={localizedHref} className="hover:underline">{title}</a>
                    </h3>
                    <p className="text-gray-600 text-[16px] leading-relaxed">
                      {desc}
                    </p>
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