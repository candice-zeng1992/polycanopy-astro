// src/components/products/ProductAnalysis.tsx
import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Search } from 'lucide-react';

interface ProductAnalysisProps {
  sectionTitle: string;
  systemDesc: string;
  whyTitle: string;
  whyDesc1: string;
  whyDesc2: string;
  whyDesc3: string;
  altSystemImg: string;
  altCompareImg: string;
  zoomTip: string; // 🌟 接收咱们刚刚说好的全局通用放大提示
}

export default function ProductAnalysis({
  sectionTitle, systemDesc, whyTitle, whyDesc1, whyDesc2, whyDesc3,
  altSystemImg, altCompareImg, zoomTip
}: ProductAnalysisProps) {

  // 🌟 独立点火：给当前组件专属的相册类名，防止和上面的材质板串台
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.pswp-analysis-gallery',
      children: 'a.pswp-trigger',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  // 从你老站源码里精准提取的两张原图
  const systemImgUrl = "https://img.polycanopy.com/2025/07/Exploded-view-of-canopy-structure-with-labeled-components-and-material-dimensions.jpg";
  const compareImgUrl = "https://img.polycanopy.com/2025/07/Visual-Comparison-of-Premium-and-Inferior-Polycarbonate-Canopy-Panels.jpg";

  return (
    <section className="w-full bg-gray-50 py-20 block">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pswp-analysis-gallery">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          {sectionTitle}
        </h2>

        {/* 模块 1：系统结构剖析（左文右图） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="flex flex-col justify-center text-start">
            <div className="w-12 h-1 bg-[#184e77] mb-6 rounded-full" />
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              {systemDesc}
            </p>
          </div>
          
          <a 
            href={systemImgUrl}
            data-pswp-width="761"
            data-pswp-height="1312"
            aria-label={zoomTip}
            className="pswp-trigger group relative w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 block"
          >
            <img 
              src={systemImgUrl} 
              alt={altSystemImg} 
              loading="lazy"
              className="w-full h-auto max-h-[500px] object-contain object-center transition-transform duration-500 group-hover:scale-103 p-4"
            />
            {/* 放大镜遮罩 */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 text-[#184e77] p-4 rounded-full bg-white/90 transition-all duration-300 shadow-lg">
                <Search size={28} strokeWidth={2.5} />
              </span>
            </div>
          </a>
        </div>

        {/* 模块 2：品质防坑对比（左图右文） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <a 
            href={compareImgUrl}
            data-pswp-width="1536"
            data-pswp-height="1024"
            aria-label={zoomTip}
            className="pswp-trigger group relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 block lg:order-1 order-2"
          >
            <img 
              src={compareImgUrl} 
              alt={altCompareImg} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
            {/* 放大镜遮罩 */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 text-[#184e77] p-4 rounded-full bg-white/90 transition-all duration-300 shadow-lg">
                <Search size={28} strokeWidth={2.5} />
              </span>
            </div>
          </a>

          <div className="flex flex-col justify-center text-start lg:order-2 order-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {whyTitle}
            </h3>
            <div className="space-y-4 text-gray-600 text-[15px] md:text-base font-light leading-relaxed">
              <p>{whyDesc1}</p>
              <p className="font-medium text-[#184e77]">{whyDesc2}</p>
              <p className="border-l-4 border-[#12b886] pl-4 italic text-gray-700 bg-gray-50 py-2 rounded-r-lg">
                {whyDesc3}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}