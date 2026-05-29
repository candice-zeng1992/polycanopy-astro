import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Product {
  slug: string;
  title: string;
  image: string;
  tags: string[]; // 这里会自动抓取各个产品节点下的 tags 数组
}

interface ProductGridProps {
  products: Product[];
  lang: string;
  viewDetailsText: string; 
  factoryDirectText?: string; // 🌟 升级：接收来自 Astro 页面的多语言工厂直供文本参数
}

export default function ProductGrid({ products, lang, viewDetailsText, factoryDirectText }: ProductGridProps) {
  // 🌟 安全兜底：如果外部传进来的 products 不是数组或为空，直接返回友好提示，防止页面白屏
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <div className="text-center py-12 text-gray-400">No products available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <a
          key={product.slug}
          /* 🌟 核心修复：将复数 /products/ 彻底更正为单数 /product/，完美对接你的单数产品新路由 */
         href={`/${lang}/products/${product.slug}`}
          className="group block bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* 封面图容器：🌟 锁死 4:3 黄金工程比例，图片完美 object-cover */}
          <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* 视觉微优化：🌟 升级：改为动态多语言展示，如果没传则智能降级回英文 'Factory Direct' */}
            <div className="absolute top-3 left-3 bg-[#184e77]/90 text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-xs">
              {factoryDirectText || 'Factory Direct'}
            </div>
          </div>
          
          {/* 文字内容及卡片追加区 */}
          <div className="p-6 flex flex-col justify-between min-h-[180px]">
            <div>
              {/* 产品大标题 */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#12b886] transition-colors line-clamp-2">
                {product.title}
              </h3>
              
              {/* 🌟 动态标签区：不管是车棚、星空房还是阳光房，它们在字典里加的特色 Tags 都会整齐呈现在这里 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags && Array.isArray(product.tags) && product.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs font-semibold bg-[#12b886]/10 text-[#12b886] px-3 py-1 rounded-full uppercase tracking-wider transition-colors group-hover:bg-[#12b886] group-hover:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 动态引导链接按钮 */}
            <div className="flex items-center text-[#184e77] font-bold text-sm group-hover:text-[#12b886] transition-all">
              <span className="group-hover:mr-1 transition-all">{viewDetailsText}</span>
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}