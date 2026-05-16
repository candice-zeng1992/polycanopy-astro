// src/components/home/CustomService.tsx

// 🌟 明确声明接收外置的超级翻译函数 t
interface CustomServiceProps {
  t: (key: string, subKey?: string) => string;
}

export default function CustomService({ t }: CustomServiceProps) {
  // 原原站的 5 个定制优势清单索引 [0, 1, 2, 3, 4]
  const listItems = [0, 1, 2, 3, 4];

  return (
    <section className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-[1200px]">
        {/* 🌟 还原原站的 aria-label 属性，提升无障碍 SEO */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          aria-label={t('ariaLabel')}
        >
          
          {/* ================= 左侧：文案与勾选列表 ================= */}
          <div className="flex flex-col">
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#333333] mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('desc')}
            </p>
            
            {/* 勾选列表 */}
            <ul className="space-y-4 m-0 p-0 list-none">
              {listItems.map((index) => (
                <li key={index} className="flex items-start gap-3 text-[16px] text-gray-700 font-medium">
                  {/* 标准 check-circle 图标 */}
                  <div className="flex-shrink-0 mt-0.5 text-[#184e77]">
                    <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
                    </svg>
                  </div>
                  {/* 🌟 优雅解开：CustomService -> items -> 0/1/2/3/4 */}
                  <span className="leading-tight">{t('items', index.toString())}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= 右侧：定制服务工厂大图 ================= */}
          <div className="w-full">
            <div className="rounded-lg overflow-hidden block shadow-sm hover:shadow-md transition-shadow">
              <img 
                src="https://img.polycanopy.com/2025/07/Polycanopy-Customization-Services.jpg" 
                alt={t('imageAlt')} 
                title={t('title')}    
                className="w-full h-auto object-cover block"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}