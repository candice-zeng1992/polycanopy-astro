// src/components/home/About.tsx

// 🌟 告诉 Astro 页面：需要从外部传翻译函数 t 进来
interface AboutProps {
  t: (key: string) => string;
}

export default function About({ t }: AboutProps) {
  // 为什么选择我们 - 4大金刚优势数据统计
  const stats = [
    // 🌟 核心修复：把 fontSize 全部转换为纯数字类型 (20, 16, 22)，杜绝字符串导致的浏览器报错
    { id: 1, color: "green", gradient: ["#A5D6A7", "#66BB6A"], fontSize: 20 },
    { id: 2, color: "orange", gradient: ["#FFAB91", "#FF7043"], fontSize: 16 },
    { id: 3, color: "yellow", gradient: ["#FFB74D", "#FF9800"], fontSize: 16 },
    { id: 4, color: "blue", gradient: ["#90CAF9", "#42A5F5"], fontSize: 22 }
  ];

  return (
    /* 🌟 关键还原：加强绿意的渐变背景 
       from-[#dcf5ed] 提供了明显的清新绿底色，via 和 to white 保证了向下一个模块过渡的平滑性
    */
    <section className="py-20 bg-gradient-to-br from-[#dcf5ed] via-[#f4fcf9] to-white px-4">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* ================= 1. About 头部与描述 ================= */}
        <header className="mb-16">
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#333333] mb-6">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            {t('desc')}
          </p>
        </header>

        {/* ================= 2. 使命与价值观 (Mission & Values) ================= */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#333333] mb-8">{t('missionTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <article key={num} className="flex gap-4 items-start bg-white/40 p-4 rounded-lg backdrop-blur-sm transition-all hover:bg-white/60">
                <div className="flex-shrink-0 mt-1">
                  {/* 原站特有的绿色小勾图标 */}
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#10b981"></circle>
                    <path d="M8 12 L11 15 L16 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold text-[#333333] mb-2">{t(`mission${num}Title`)}</h4>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{t(`mission${num}Desc`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ================= 3. 为什么选择我们 (四大优势数据) ================= */}
        <div>
          <h3 className="text-2xl font-bold text-[#333333] mb-10">{t('whyTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {stats.map((stat) => (
              <article key={stat.id} className="flex flex-col items-start lg:items-center text-left lg:text-center group">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 shadow-sm rounded-full">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 64 64">
                    <defs>
                      <radialGradient id={`grad-${stat.id}`} cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stopColor={stat.gradient[0]} />
                        <stop offset="100%" stopColor={stat.gradient[1]} />
                      </radialGradient>
                    </defs>
                    <circle cx="32" cy="32" r="31" fill={`url(#grad-${stat.id})`} />
                    <text 
                      x="32" 
                      y={stat.id === 4 ? "40" : "38"} 
                      textAnchor="middle" 
                      fill="white" 
                      fontFamily="Arial, sans-serif" 
                      fontSize={stat.fontSize} 
                      fontWeight="bold"
                    >
                      {t(`stat${stat.id}Num`)}
                    </text>
                  </svg>
                </div>
                <h4 className="font-bold text-[18px] text-[#333333] group-hover:text-[#10b981] transition-colors">
                  {t(`stat${stat.id}Text`)}
                </h4>
              </article>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}