// src/components/home/Faq.tsx
import { useState } from 'react';

// 定义单个 FAQ 问题的结构
interface FaqItem {
  q: string;
  a: string;
}

// 属性接口：只接收纯粹的字符串和干净的数组
interface FaqProps {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export default function Faq({ title, subtitle, items = [] }: FaqProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  // 即使 items 漏掉，也准备 8 个纯静态英文占位，确保无论如何页面都不可能空着
  const fallbackItems: FaqItem[] = [
    { q: "Can the canopy be customized to fit my space?", a: "Yes! We offer full customization in terms of dimensions, colors, panel thickness, and frame styles to fit residential or commercial applications." },
    { q: "Is polycarbonate really stronger than glass?", a: "Absolutely. Polycarbonate sheets are up to 200 times stronger than glass and are virtually unbreakable." },
    { q: "Does the awning block UV rays?", a: "Yes, all our awnings come with UV-resistant coatings that block over 99% of harmful UV radiation." },
    { q: "How long does installation take?", a: "Most installations take several hours for a standard-size awning. We provide easy-to-follow instructions." },
    { q: "How durable is the awning in extreme weather?", a: "Our polycarbonate awnings are engineered to withstand strong wind loads, heavy rain, and snow." },
    { q: "What is the warranty period?", a: "We provide a 10-year limited warranty covering material defects, discoloration, and structural performance." },
    { q: "Do you offer bulk pricing for distributors?", a: "Yes, we offer tiered wholesale pricing and OEM/ODM services for partners, contractors, and distributors." },
    { q: "What colors and finishes are available?", a: "Our polycarbonate panels come in clear, grey, bronze, and blue tints. Frame colors include matte black, white, and gray." }
  ];

  // 最终使用的数组：如果传入的 items 有效且有长度，用传入的；否则用备用的
  const finalItems = items && items.length > 0 ? items : fallbackItems;

  // 将数据平分成左右两列
  const leftColumnItems = finalItems.slice(0, 4);
  const rightColumnItems = finalItems.slice(4, 8);

  const renderItem = (item: FaqItem, globalIndex: number) => {
    const isOpen = openIndexes.includes(globalIndex);

    return (
      <div key={globalIndex} className="mb-4 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
        <button
          className="w-full text-start px-6 py-5 flex justify-between items-center bg-white/50 hover:bg-gray-50/80 transition-colors gap-4 cursor-pointer"
          onClick={() => toggleFaq(globalIndex)}
          aria-expanded={isOpen}
          type="button"
        >
          <span className="font-bold text-[#184e77] text-[16px] md:text-[17px] leading-snug">
            {item.q}
          </span>
          <span className="flex-shrink-0 text-[#184e77] transform transition-transform duration-200">
            {isOpen ? (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect y="7.64" width="16" height="0.76"></rect>
              </svg>
            ) : (
              <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <polygon points="8.39 7.64 8.39 0 7.61 0 7.61 7.64 0 7.64 0 8.4 7.61 8.4 7.61 16 8.39 16 8.39 8.4 16 8.4 16 7.64 8.39 7.64"></polygon>
              </svg>
            )}
          </span>
        </button>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'}`}>
          <div className="p-6 text-gray-600 text-[15px] leading-relaxed bg-white text-start">
            <p className="m-0 p-0">{item.a}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-[#d4f0e9] via-[#f4fcf9] to-white block w-full relative z-30">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#333333] mb-4">{title}</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
          <div className="flex flex-col">
            {leftColumnItems.map((item, i) => renderItem(item, i))}
          </div>
          <div className="flex flex-col">
            {rightColumnItems.map((item, i) => renderItem(item, i + 4))}
          </div>
        </div>
      </div>
    </section>
  );
}