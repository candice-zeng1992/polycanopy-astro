// src/components/service/FactoryTour.tsx
import { useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { Search } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

interface SectionData {
  heading: string;
  desc: string;
  images: ImageItem[];
  zoomTip: string;
}

interface FactoryTourProps {
  title: string;
  subtitle: string;
  pc: SectionData;
  aluminum: SectionData;
}

function TourSection({ section, side }: { section: SectionData; side: 'left' | 'right' }) {
  const isImageRight = side === 'right';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
      {/* Text side */}
      <div className={`flex flex-col text-start justify-center ${isImageRight ? 'lg:order-1 order-2' : 'lg:order-2 order-2'}`}>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.heading}</h3>
        <div className="w-12 h-1 bg-[#184e77] mb-6 rounded-full" />
        <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base mb-8">
          {section.desc}
        </p>

        {/* Image list as captioned thumbnails */}
        <div className="space-y-4">
          {section.images.map((img, idx) => (
            <a
              key={idx}
              href={img.src}
              data-pswp-width={img.width || '1200'}
              data-pswp-height={img.height || '900'}
              aria-label={section.zoomTip}
              className="pswp-trigger group flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#184e77]/20 hover:shadow-sm transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="text-sm text-gray-600 font-medium flex-1 group-hover:text-gray-900 transition-colors">
                {img.alt}
              </span>
              <Search size={16} className="text-gray-300 group-hover:text-[#184e77] transition-colors shrink-0" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>

      {/* Image side - main large preview */}
      <div className={`w-full ${isImageRight ? 'lg:order-2 order-1' : 'lg:order-1 order-1'}`}>
        <a
          href={section.images[0]?.src || ''}
          data-pswp-width={section.images[0]?.width || '1200'}
          data-pswp-height={section.images[0]?.height || '900'}
          aria-label={section.zoomTip}
          className="pswp-trigger group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-gray-50 border border-gray-100 block"
        >
          <img
            src={section.images[0]?.src || ''}
            alt={section.images[0]?.alt || ''}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/50 transition-all duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 text-[#184e77] p-4 rounded-full bg-white/80 transition-all duration-300 shadow-md">
              <Search size={28} strokeWidth={2.5} />
            </span>
          </div>
        </a>
      </div>
    </div>
  );
}

export default function FactoryTour({ title, subtitle, pc, aluminum }: FactoryTourProps) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.pswp-factory-gallery',
      children: 'a.pswp-trigger',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
    return () => { lightbox.destroy(); };
  }, []);

  return (
    <section className="w-full bg-white py-20 block border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pswp-factory-gallery">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-1 bg-[#184e77] mx-auto mb-6 rounded-full" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-gray-500 font-light leading-relaxed">{subtitle}</p>
        </div>

        {/* PC Section (image left) */}
        <div className="mb-20 lg:mb-28">
          <TourSection section={pc} side="left" />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-20 lg:mb-28" />

        {/* Aluminum Section (image right) */}
        <div>
          <TourSection section={aluminum} side="right" />
        </div>
      </div>
    </section>
  );
}