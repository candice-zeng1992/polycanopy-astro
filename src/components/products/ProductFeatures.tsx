// src/components/products/ProductFeatures.tsx
import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Search, ShieldCheck } from 'lucide-react';

// 🌟 1. 结构大升级：允许一个特性拥有多张图片（数组）
interface ImageItem {
  src: string;
  width: string;
  height: string;
  alt: string; 
}

interface FeatureItem {
  id: number;
  title: string;
  desc: string;
  images: ImageItem[]; // 🌟 变更为数组
}

interface ProductFeaturesProps {
  sectionTitle: string;
  badge1: string;
  badge2: string;
  badge3: string;
  badge4: string;
  badge5: string;
  features: FeatureItem[];
  zoomTip: string;
  mainFeatImg: string;
  mainFeatAlt: string;
  mainFeatZoomTip: string;
  subHeading: string;
  subDesc: string;
  testLabel: string;
}

export default function ProductFeatures({
  sectionTitle, badge1, badge2, badge3, badge4, badge5, features, zoomTip,
  mainFeatImg, mainFeatAlt, mainFeatZoomTip, subHeading, subDesc, testLabel
}: ProductFeaturesProps) {

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.pswp-features-gallery',
      children: 'a.pswp-trigger',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
    return () => { lightbox.destroy(); };
  }, []);

  const badges = [badge1, badge2, badge3, badge4, badge5];

  return (
    <section className="w-full bg-white py-20 block border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pswp-features-gallery">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          {sectionTitle}
        </h2>

        {/* 五大核心特性与综合蓝图 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 bg-gray-50/50 rounded-3xl p-6 md:p-10 border border-gray-100/80">
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-center order-2 lg:order-1">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs transition-all duration-300 hover:border-[#12b886]/30 hover:shadow-xs">
                <div className="p-2.5 rounded-xl bg-[#12b886]/10 text-[#12b886] shrink-0">
                  <ShieldCheck size={22} strokeWidth={2.5} />
                </div>
                <span className="text-base font-semibold text-gray-800 tracking-wide text-start">
                  {badge}
                </span>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 w-full order-1 lg:order-2">
            <a href={mainFeatImg} data-pswp-width="750" data-pswp-height="732" aria-label={mainFeatZoomTip} className="pswp-trigger group relative w-full aspect-[750/732] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 block">
              <img src={mainFeatImg} alt={mainFeatAlt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 text-[#184e77] p-4 rounded-full bg-white/90 transition-all duration-300 shadow-md">
                  <Search size={32} strokeWidth={2.5} />
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* 隔离带标题 */}
        <div className="text-center mb-16">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800">{subHeading}</h3>
          <p className="text-sm text-gray-400 mt-2">{subDesc}</p>
        </div>

        {/* 🌟 核心双擎排版区 */}
        <div className="space-y-24 w-full">
          {features.map((item, index) => {
            const isEven = index % 2 === 0;
            const hasMultipleImages = item.images.length > 1;

            return (
              <div key={item.id} className="w-full">
                
                {/* 模式 A：单张图片 -> 左右交替排版 */}
                {!hasMultipleImages && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    <div className={`flex flex-col text-start justify-center ${isEven ? 'lg:order-1 order-2' : 'lg:order-2 order-2'}`}>
                      <span className="text-xs font-bold text-[#12b886] tracking-widest uppercase mb-2">
                        0{index + 1} . {testLabel}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      <div className="w-12 h-1 bg-[#184e77] mb-6 rounded-full" />
                      <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base whitespace-pre-line">{item.desc}</p>
                    </div>

                    <div className={`w-full ${isEven ? 'lg:order-2 order-1' : 'lg:order-1 order-1'}`}>
                      <a href={item.images[0].src} data-pswp-width={item.images[0].width} data-pswp-height={item.images[0].height} aria-label={zoomTip} className="pswp-trigger group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 border border-gray-100 block">
                        <img src={item.images[0].src} alt={item.images[0].alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/50 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 text-[#184e77] p-4 rounded-full bg-white/80 transition-all duration-300 shadow-md">
                            <Search size={28} strokeWidth={2.5} />
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}

                {/* 🌟 模式 B：多张图片 -> 恢复你老站的“上文下图”满版并列排版 */}
                {hasMultipleImages && (
                  <div className="flex flex-col w-full bg-gray-50/40 rounded-3xl p-6 md:p-10 border border-gray-100">
                    <div className="flex flex-col text-start justify-center mb-10 w-full">
                      <span className="text-xs font-bold text-[#12b886] tracking-widest uppercase mb-2">
                        0{index + 1} . {testLabel}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      <div className="w-12 h-1 bg-[#184e77] mb-6 rounded-full" />
                      <p className="text-gray-600 font-light leading-relaxed text-sm md:text-base whitespace-pre-line">{item.desc}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      {item.images.map((img, imgIdx) => (
                        <a key={imgIdx} href={img.src} data-pswp-width={img.width} data-pswp-height={img.height} aria-label={zoomTip} className="pswp-trigger group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border border-gray-100 block">
                          <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/50 transition-all duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 text-[#184e77] p-4 rounded-full bg-white/80 transition-all duration-300 shadow-md">
                              <Search size={28} strokeWidth={2.5} />
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}