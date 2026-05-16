// src/components/home/Testimonials.tsx

// 🌟 声明接收外置的超级翻译函数 t
interface TestimonialsProps {
  t: (indexKey: string, subKey: string) => string;
}

export default function Testimonials({ t }: TestimonialsProps) {
  // 6张真实评价卡片对应的数组索引 [0, 1, 2, 3, 4, 5]
  const reviewIndexes = [0, 1, 2, 3, 4, 5];

  return (
    /* 🌟 还原：带有漂亮淡绿色彩深度的渐变背景环境 */
    <section className="py-20 px-4 bg-gradient-to-br from-[#d4f0e9] via-[#f7fdfb] to-white">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* ================= 头部文案 ================= */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#333333] mb-4">
            {t('global', 'title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            {t('global', 'subtitle')}
          </p>
        </div>

        {/* ================= 评价卡片网格 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewIndexes.map((index) => {
            // 🌟 核心提取：Testimonials -> reviews -> 0/1/2/3/4/5 -> text/name/role/company/country
            const text = t(index.toString(), 'text');
            const name = t(index.toString(), 'name');
            const role = t(index.toString(), 'role');
            const company = t(index.toString(), 'company');
            const country = t(index.toString(), 'country');

            return (
              <article 
                key={index} 
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* 上半部分：星级与评语 */}
                <div className="flex flex-col text-start">
                  {/* 金色五星评分：Unicode 渲染 */}
                  <div className="flex gap-1 mb-4 text-[#ffb74d] justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-xl">★</span>
                    ))}
                  </div>

                  {/* 真实评语文本 */}
                  <p className="text-gray-600 text-[15px] leading-relaxed mb-6 italic">
                    "{text}"
                  </p>
                </div>

                {/* 下半部分：客户身份信息（自适应 LTR/RTL 靠边对齐） */}
                <div className="border-t border-gray-100 pt-4 flex flex-col ltr:items-start rtl:items-end text-start">
                  <h3 className="font-bold text-[#184e77] text-[16px] mb-1">
                    {name}
                  </h3>
                  <div className="text-gray-500 text-xs leading-normal">
                    <p className="m-0">{role}</p>
                    <p className="m-0 font-medium text-gray-700">{company}</p>
                    <p className="m-0 text-gray-400 font-semibold uppercase tracking-wider text-[10px] mt-1">{country}</p>
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