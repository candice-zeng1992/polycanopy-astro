// src/components/home/Faq.tsx
import { useState } from 'react';

interface FaqProps {
  t: (indexKey: string, subKey: string) => string;
  title: string;
  subtitle: string;
}

export default function Faq({ t, title, subtitle }: FaqProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const leftColumnIndexes = [0, 1, 2, 3];
  const rightColumnIndexes = [4, 5, 6, 7];

  const renderFaqItem = (index: number) => {
    const isOpen = openIndexes.includes(index);
    
    // 🌟 终极容错：如果 t 没拿到东西，就显示 Question X 占位，绝不允许 React 因为吃到 undefined 崩掉后面所有的组件！
    const questionText = t(index.toString(), 'q') || `Question ${index + 1}`;
    const answerText = t(index.toString(), 'a') || "Answer detail information coming soon.";

    return (
      <div key={index} className="mb-4 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
        <button
          className="w-full text-start px-6 py-5 flex justify-between items-center bg-white/50 hover:bg-gray-50/80 transition-colors gap-4 cursor-pointer"
          onClick={() => toggleFaq(index)}
          aria-expanded={isOpen}
          type="button"
        >
          <span className="font-bold text-[#184e77] text-[16px] md:text-[17px] leading-snug">
            {questionText}
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
            <p className="m-0 p-0">{answerText}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-tr from-[#d4f0e9] via-[#f4fcf9] to-white block w-full relative z-30">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#333333] mb-4">
            {title || "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            {subtitle || "Everything you need to know about our polycarbonate canopy products."}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
          <div className="flex flex-col">{leftColumnIndexes.map((index) => renderFaqItem(index))}</div>
          <div className="flex flex-col">{rightColumnIndexes.map((index) => renderFaqItem(index))}</div>
        </div>
      </div>
    </section>
  );
}