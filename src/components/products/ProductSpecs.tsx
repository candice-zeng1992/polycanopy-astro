// src/components/products/ProductSpecs.tsx
import React from 'react';

interface SpecItem {
  id: number;
  title: string;
  desc: string;
  img?: string; // 增加图片属性
  alt?: string;
}

interface ProductSpecsProps {
  title: string;
  specs: SpecItem[];
}

export default function ProductSpecs({ title, specs }: ProductSpecsProps) {
  return (
    <section className="w-full bg-gray-50 py-16 block">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {specs.map((spec) => (
            <div 
              key={spec.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* 🌟 核心修改：如果有图片，显示为可放大的图；如果没有，显示文字 */}
              {spec.img ? (
                <a href={spec.img} className="pswp-link cursor-zoom-in block mb-4" data-pswp-width="1200" data-pswp-height="800" target="_blank">
                  <img src={spec.img} alt={spec.alt || spec.title} className="w-full h-32 object-cover rounded-lg mb-2" loading="lazy" />
                  <h3 className="text-lg font-semibold text-gray-800">{spec.title}</h3>
                </a>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{spec.title}</h3>
                  <div className="w-12 h-1 bg-[#184e77] mx-auto mb-4 rounded-full" />
                </div>
              )}
              
              <p className="text-gray-600 font-light text-sm leading-relaxed">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}