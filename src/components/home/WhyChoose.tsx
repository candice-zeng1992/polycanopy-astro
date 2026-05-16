// src/components/home/WhyChoose.tsx

// 🌟 声明接收外置超级翻译函数 t 和当前语言 lang
interface WhyChooseProps {
  t: (key: string, subKey?: string) => string;
  lang: string;
}

export default function WhyChoose({ t, lang }: WhyChooseProps) {

  // 严格继承原站的跳转链接与特定深度锚点映射
  const advantages = [
    {
      id: 'service',
      href: '/service#Process',
      icon: (
        <svg aria-hidden="true" className="w-10 h-10 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
        </svg>
      )
    },
    {
      id: 'custom',
      href: '/service#Process',
      icon: (
        <svg aria-hidden="true" className="w-10 h-10 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M109.46 244.04l134.58-134.56-44.12-44.12-61.68 61.68a7.919 7.919 0 0 1-11.21 0l-11.21-11.21c-3.1-3.1-3.1-8.12 0-11.21l61.68-61.68-33.64-33.65C131.47-3.1 111.39-3.1 99 9.29L9.29 99c-12.38 12.39-12.39 32.47 0 44.86l100.17 100.18zm388.47-116.8c18.76-18.76 18.75-49.17 0-67.93l-45.25-45.25c-18.76-18.76-49.18-18.76-67.95 0l-46.02 46.01 113.2 113.2 46.02-46.03zM316.08 82.71l-297 296.96L.32 487.11c-2.53 14.49 10.09 27.11 24.59 24.56l107.45-18.84L429.28 195.9 316.08 82.71zm186.63 285.43l-33.64-33.64-61.68 61.68c-3.1 3.1-8.12 3.1-11.21 0l-11.21-11.21c-3.09-3.1-3.09-8.12 0-11.21l61.68-61.68-44.14-44.14L267.93 402.5l100.21 100.2c12.39 12.39 32.47 12.39 44.86 0l89.71-89.7c12.39-12.39 12.39-32.47 0-44.86z"></path>
        </svg>
      )
    },
    {
      id: 'export',
      href: '/service/#why',
      icon: (
        <svg aria-hidden="true" className="w-10 h-10 fill-current" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M519.2 127.9l-47.6-47.6A56.252 56.252 0 0 0 432 64H205.2c-14.8 0-29.1 5.9-39.6 16.3L118 127.9H0v255.7h64c17.6 0 31.8-14.2 31.9-31.7h9.1l84.6 76.4c30.9 25.1 73.8 25.7 105.6 3.8 12.5 10.8 26 15.9 41.1 15.9 18.2 0 35.3-7.4 48.8-24 22.1 8.7 48.2 2.6 64-16.8l26.2-32.3c5.6-6.9 9.1-14.8 10.9-23h57.9c.1 17.5 14.4 31.7 31.9 31.7h64V127.9H519.2zM48 351.6c-8.8 0-16-7.2-16 16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16zm390-6.9l-26.1 32.2c-2.8 3.4-7.8 4-11.3 1.2l-23.9-19.4-30 36.5c-6 7.3-15 4.8-18 2.4l-36.8-31.5-15.6 19.2c-13.9 17.1-39.2 19.7-55.3 6.6l-97.3-88H96V175.8h41.9l61.7-61.6c2-.8 3.7-1.5 5.7-2.3H262l-38.7 35.5c-29.4 26.9-31.1 72.3-4.4 101.3 14.8 16.2 61.2 41.2 101.5 4.4l8.2-7.5 108.2 87.8c3.4 2.8 3.9 7.9 1.2 11.3zm106-40.8h-69.2c-2.3-2.8-4.9-5.4-7.7-7.7l-102.7-83.4 12.5-11.4c6.5-6 7-16.1 1-22.6L367 167.1c-6-6.5-16.1-6.9-22.6-1l-55.2 50.6c-9.5 8.7-25.7 9.4-34.6 0-9.3-9.9-8.5-25.1 1.2-33.9l65.6-60.1c7.4-6.8 17-10.5 27-10.5l83.7-.2c2.1 0 4.1.8 5.5 2.3l61.7 61.6H544v128zm48 47.7c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16z"></path>
        </svg>
      )
    },
    {
      id: 'quote',
      href: '/service/#why',
      icon: (
        <svg aria-hidden="true" className="w-10 h-10 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
        </svg>
      )
    }
  ];

  return (
    /* 🌟 还原原站白底：通过清爽的白底提供视觉缓冲 */
    <section className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-[1200px]" aria-label={t('ariaLabel')}>
        
        {/* ================= 头部文案 ================= */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#333333] mb-4 hover:underline">
            <a href={`/${lang}/service`}>
              {t('title')}
            </a>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* ================= 四列优势网格 ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item) => {
            // 🌟 核心提取：WhyChoose -> items -> itemId -> title/desc/ariaLabel
            const title = t(item.id, 'title');
            const desc = t(item.id, 'desc');
            const ariaLabel = t(item.id, 'ariaLabel');

            return (
              <article 
                key={item.id} 
                className="flex flex-col items-center text-center p-4 group"
              >
                {/* 图标链接 */}
                <a 
                  href={`/${lang}${item.href}`}
                  aria-label={ariaLabel}
                  className="mb-6 p-4 rounded-full bg-gray-50 text-[#184e77] hover:bg-[#184e77] hover:text-white transition-all duration-300 inline-block shadow-sm"
                >
                  {item.icon}
                </a>
                
                {/* 优势标题 */}
                <h3 className="text-xl font-bold text-[#333333] mb-3">
                  <a href={`/${lang}${item.href}`} className="hover:underline hover:text-[#10b981] transition-colors">
                    {title}
                  </a>
                </h3>
                
                {/* 优势描述 */}
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {desc}
                </p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}