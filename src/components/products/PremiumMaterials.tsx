// src/components/products/PremiumMaterials.tsx
import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Search, Diamond } from 'lucide-react';

interface PremiumMaterialsProps {
  title: string;
  desc: string;
  // 🌟 结构优化：保留两个核心物料标签文本，但合并在文字区展示
  mat1Label: string; 
  mat2Label: string;
  // 🌟 核心新增：单一长方形大图接口
  imgSrc: string;
  imgAlt: string;
  zoomTip: string;
}

export default function PremiumMaterials({
  title, desc, mat1Label, mat2Label, imgSrc, imgAlt, zoomTip
}: PremiumMaterialsProps) {

  // 初始化专属相册
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.pswp-premium-single-gallery',
      children: 'a.pswp-trigger',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
    return () => { lightbox.destroy(); };
  }, []);

  return (
    <section className="w-full bg-gray-900 py-24 block relative overflow-hidden">
      {/* 深色奢华底纹 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#12b886]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#184e77]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 pswp-premium-single-gallery">
        
        {/* 1. 顶部文字区（含两个物料标签） */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-[#12b886]">
              <Diamond size={32} strokeWidth={2} />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-10">
            {desc}
          </p>
          
          {/* 🌟 还原老站：将骨架和板材两个标签作为总结性高光词条并列展示 */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-white text-lg font-semibold tracking-wide">
            <div className="flex items-center gap-3">
              <span className="w-2 h-8 bg-[#12b886] rounded-full" />
              {mat1Label}
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-8 bg-[#184e77] rounded-full" />
              {mat2Label}
            </div>
          </div>
        </div>

        {/* 2. 🌟 下方归位：满幅长方形高质量大图 */}
        <div className="w-full max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-4 shadow-xl">
          <a 
            href={imgSrc}
            // 根据长方形特性（可能是 16:9 或 3:2），设置 estimated 大画幅尺寸用于 PhotoSwipe
            data-pswp-width="1200"
            data-pswp-height="675" // 16:9 比例的一个估计值
            aria-label={zoomTip}
            className="pswp-trigger group relative w-full aspect-[16/9] rounded-2xl overflow-hidden block"
          >
            <img 
              src={imgSrc} 
              alt={imgAlt} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            {/* 呼吸灯放大镜遮罩 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 text-white p-5 rounded-full bg-[#184e77]/90 transition-all duration-300 shadow-xl">
                <Search size={32} strokeWidth={3} />
              </span>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}