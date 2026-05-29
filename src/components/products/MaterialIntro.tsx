// src/components/products/MaterialIntro.tsx
import { useState, useEffect } from 'react';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

interface ColorItem {
  id: string;
  label: string;
  alt: string;
  img: string;
}

interface MaterialIntroProps {
  frameHeading: string;
  frameDesc: string;
  panelHeading: string;
  panelDesc: string;
  colorBronze: string;
  colorWhite: string;
  colorGray: string;
  colorBlack: string;
  colorChampagne: string;
  ariaFrameBtnTemplate: string;
  ariaPanelBtnTemplate: string;
  altFrameChampagne: string;
  altFrameWhite: string;
  altFrameGray: string;
  altFrameCoffee: string;
  altPanelBronze: string;
  altPanelWhite: string;
  altPanelGray: string;
  altPanelBlack: string;
  // 🌟 核心新增：专门接收悬停放大提示的多语言文本
  zoomTipFrame: string;
  zoomTipPanel: string;
}

export default function MaterialIntro({
  frameHeading, frameDesc, panelHeading, panelDesc,
  colorBronze, colorWhite, colorGray, colorBlack, colorChampagne,
  ariaFrameBtnTemplate, ariaPanelBtnTemplate,
  altFrameChampagne, altFrameWhite, altFrameGray, altFrameCoffee,
  altPanelBronze, altPanelWhite, altPanelGray, altPanelBlack,
  zoomTipFrame, zoomTipPanel
}: MaterialIntroProps) {

  const frameColors: ColorItem[] = [
    { id: 'champagne', label: colorChampagne, alt: altFrameChampagne, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
    { id: 'white', label: colorWhite, alt: altFrameWhite, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
    { id: 'gray', label: colorGray, alt: altFrameGray, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
    { id: 'coffee', label: 'Coffee', alt: altFrameCoffee, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
  ];

  const panelColors: ColorItem[] = [
    { id: 'bronze', label: colorBronze, alt: altPanelBronze, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
    { id: 'white', label: colorWhite, alt: altPanelWhite, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
    { id: 'gray', label: colorGray, alt: altPanelGray, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
    { id: 'black', label: colorBlack, alt: altPanelBlack, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
  ];

  const [activeFrame, setActiveFrame] = useState<ColorItem>(frameColors[0]);
  const [activePanel, setActivePanel] = useState<ColorItem>(panelColors[0]);

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '.pswp-material-gallery',
      children: 'a.pswp-trigger',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  const parseAriaLabel = (template: string, value: string) => {
    if (!template) return `Switch to ${value}`;
    return template.replace(/{color}/g, value);
  };

  return (
    <section className="w-full bg-white py-16 block">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* ================= 左侧：铝合金骨架选型块 ================= */}
        <div className="flex flex-col justify-between border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm text-start bg-white pswp-material-gallery">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{frameHeading}</h3>
            <p className="text-gray-600 mb-6 font-light leading-relaxed text-sm md:text-base">{frameDesc}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {frameColors.map((color) => {
                const isSelected = activeFrame.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setActiveFrame(color)}
                    aria-label={parseAriaLabel(ariaFrameBtnTemplate, color.label)}
                    type="button"
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#184e77] text-white border-[#184e77] shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {color.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          <a 
            href={activeFrame.img}
            data-pswp-width="1200"
            data-pswp-height="900"
            aria-label={zoomTipFrame}
            className="pswp-trigger group relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden bg-gray-50 block shadow-sm"
          >
            <img 
              src={activeFrame.img} 
              alt={activeFrame.alt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              loading="lazy"
            />
            {/* 悬停提示文字：完美符合高对比度深翡翠绿 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 text-white bg-[#184e77]/90 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-md">
                {zoomTipFrame}
              </span>
            </div>
          </a>
        </div>

        {/* ================= 右侧：聚碳酸酯板材选型块 ================= */}
        <div className="flex flex-col justify-between border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm text-start bg-white pswp-material-gallery">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{panelHeading}</h3>
            <p className="text-gray-600 mb-6 font-light leading-relaxed text-sm md:text-base">{panelDesc}</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {panelColors.map((color) => {
                const isSelected = activePanel.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setActivePanel(color)}
                    aria-label={parseAriaLabel(ariaPanelBtnTemplate, color.label)}
                    type="button"
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#184e77] text-white border-[#184e77] shadow-md'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {color.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          <a 
            href={activePanel.img}
            data-pswp-width="1200"
            data-pswp-height="900"
            aria-label={zoomTipPanel}
            className="pswp-trigger group relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden bg-gray-50 block shadow-sm"
          >
            <img 
              src={activePanel.img} 
              alt={activePanel.alt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 text-white bg-[#184e77]/90 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-md">
                {zoomTipPanel}
              </span>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}