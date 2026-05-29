import React from 'react';

interface CardItem {
  title: string;
  desc: string;
}

interface ServiceHeroProps {
  heading: string;
  subtitle: string;
  cards: CardItem[];
  advantageLabel?: string; // 🌟 新增：用来接收多语言的优势标签
}

export default function ServiceHero({ heading, subtitle, cards, advantageLabel }: ServiceHeroProps) {
  return (
    <section className="relative bg-[#184e77] pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 科技感背景微光装饰 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#12b886]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto text-center mb-16">
        {/* 尊贵感大标题 - 深色底用纯白 */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          {heading}
        </h1>
        {/* 大厂标语 - 稍微带点优雅的灰白 */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-200 font-medium leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Why Work With Us 核心四大优势 */}
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#12b886]/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* 🌟 核心修复：把写死的 ADVANTAGE 换成了动态变量 */}
                <span className="text-xs font-bold text-[#12b886] tracking-wider uppercase opacity-80 block mb-3">
                  0{index + 1} . {advantageLabel || 'ADVANTAGE'}
                </span>
                {/* 核心优势标题 - 白色 */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#12b886] transition-colors duration-200">
                  {card.title}
                </h3>
                {/* 深度专业描述 - 浅灰 */}
                <p className="text-slate-300 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}