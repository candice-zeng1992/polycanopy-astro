// src/components/products/MaterialIntro.tsx
import { useState } from 'react';

// 定义单项颜色切片的底层数据接口
interface ColorItem {
  id: string;
  label: string;
  alt: string;
  img: string;
}

// 组件外部注入的纯死字符串字典接口
interface MaterialIntroProps {
  frameHeading: string;
  frameDesc: string;
  panelHeading: string;
  panelDesc: string;
  // 板材多语言标签
  colorBronze: string;
  colorWhite: string;
  colorGray: string;
  colorBlack: string;
  // 骨架多语言标签
  colorChampagne: string;
  // 动态 Aria 模板文字（例如："Switch frame to {color} color"）
  ariaFrameBtnTemplate: string;
  ariaPanelBtnTemplate: string;
  // 各种切图的 Alt 翻译
  altFrameChampagne: string;
  altFrameWhite: string;
  altFrameGray: string;
  altFrameCoffee: string;
  altPanelBronze: string;
  altPanelWhite: string;
  altPanelGray: string;
  altPanelBlack: string;
}

export default function MaterialIntro({
  frameHeading, frameDesc, panelHeading, panelDesc,
  colorBronze, colorWhite, colorGray, colorBlack, colorChampagne,
  ariaFrameBtnTemplate, ariaPanelBtnTemplate,
  altFrameChampagne, altFrameWhite, altFrameGray, altFrameCoffee,
  altPanelBronze, altPanelWhite, altPanelGray, altPanelBlack
}: MaterialIntroProps) {

  // 1. 骨架颜色池数据重组
  const frameColors: ColorItem[] = [
    { id: 'champagne', label: colorChampagne, alt: altFrameChampagne, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
    { id: 'white', label: colorWhite, alt: altFrameWhite, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
    { id: 'gray', label: colorGray, alt: altFrameGray, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
    { id: 'coffee', label: 'Coffee', alt: altFrameCoffee, img: 'https://img.polycanopy.com/2025/07/canopy-frame-color-options-available-in-champagne-white-gray-and-coffee-finishes.jpg' },
  ];

  // 2. 板材颜色池数据重组
  const panelColors: ColorItem[] = [
    { id: 'bronze', label: colorBronze, alt: altPanelBronze, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
    { id: 'white', label: colorWhite, alt: altPanelWhite, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
    { id: 'gray', label: colorGray, alt: altPanelGray, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
    { id: 'black', label: colorBlack, alt: altPanelBlack, img: 'https://img.polycanopy.com/2025/07/Various-Colors-of-Polycarbonate-Solid-Sheets.jpg' },
  ];

  const [activeFrame, setActiveFrame] = useState<ColorItem>(frameColors[0]);
  const [activePanel, setActivePanel] = useState<ColorItem>(panelColors[0]);

  // 🌟 降维核心：手动解析 JSON 里的 {color} 动态占位符，完美平替 useTranslations 的变量注入功能
  const parseAriaLabel = (template: string, value: string) => {
    if (!template) return `Switch to ${value}`;
    return template.replace(/{color}/g, value);
  };

  return (
    <section className="w-full bg-white py-16 block">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* ================= 左侧：铝合金骨架选型块 ================= */}
        <div className="flex flex-col justify-between border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm text-start bg-white">
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
          
          <div className="relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden bg-gray-50 group">
            <img 
              src={activeFrame.img} 
              alt={activeFrame.alt} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
              loading="lazy"
            />
          </div>
        </div>

        {/* ================= 右侧：聚碳酸酯板材选型块 ================= */}
        <div className="flex flex-col justify-between border border-gray-100 p-6 md:p-8 rounded-2xl shadow-sm text-start bg-white">
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
          
          <div className="relative w-full h-[250px] md:h-[300px] rounded-xl overflow-hidden bg-gray-50 group">
            <img 
              src={activePanel.img} 
              alt={activePanel.alt} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}