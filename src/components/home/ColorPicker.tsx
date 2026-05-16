// src/components/home/ColorPicker.tsx
import { useState } from 'react';

interface ColorPickerProps {
  title: string;
  subtitle: string;
  consoleTitle: string;
  plateTitle: string;
  frameTitle: string;
  plateClear: string;
  plateBronze: string;
  plateLakeblue: string;
  plateGray: string;
  frameWhite: string;
  frameBlack: string;
  frameGray: string;
  frameCoffee: string;
}

export default function ColorPicker({
  title, subtitle, consoleTitle, plateTitle, frameTitle,
  plateClear, plateBronze, plateLakeblue, plateGray,
  frameWhite, frameBlack, frameGray, frameCoffee
}: ColorPickerProps) {
  
  // 🌟 1. 板材颜色字典：把 ID 严格对齐你 R2 云端切图的命名规范（比如 clear, bronze, gray）
  const plates = [
    { id: 'clear', hex: '#ffffff', border: 'border-gray-300', label: plateClear },
    { id: 'bronze', hex: '#8a5a36', border: 'border-transparent', label: plateBronze },
    { id: 'lakeblue', hex: '#008b8b', border: 'border-transparent', label: plateLakeblue },
    { id: 'gray', hex: '#808080', border: 'border-transparent', label: plateGray }
  ];
  const [selectedPlate, setSelectedPlate] = useState('clear');

  // 🌟 2. 铝合金骨架颜色字典：把 ID 对齐云端命名（比如 white, black, gray, coffee）
  const frames = [
    { id: 'white', hex: '#f5f5f5', border: 'border-gray-200', label: frameWhite },
    { id: 'black', hex: '#1a1a1a', border: 'border-transparent', label: frameBlack },
    { id: 'gray', hex: '#4a4a4a', border: 'border-transparent', label: frameGray },
    { id: 'coffee', hex: '#4b3621', border: 'border-transparent', label: frameCoffee },
  ];
  const [selectedFrame, setSelectedFrame] = useState('black');

  // 🌟 3. 终极修正：不要那个莫须有的 color-picker 文件夹了！
  // 假设你的真实图片平铺在 R2 根目录下，命名叫 `canopy-clear-black.jpg` 这种格式
  // 你可以根据你 R2 桶里实际上传的图，把这里的 "canopy-" 换成你真实的文件前缀！
  const currentImageUrl = `https://img.polycanopy.com/canopy-${selectedPlate}-${selectedFrame}.jpg`;

  const currentPlateLabel = plates.find(p => p.id === selectedPlate)?.label || '';
  const currentFrameLabel = frames.find(f => f.id === selectedFrame)?.label || '';

  return (
    <section className="py-20 bg-gray-50 px-4 block w-full">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#333333] mb-4">{title}</h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          
          {/* 左侧大图：加载你 R2 里的真图 */}
          <div className="w-full relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
            <img 
              src={currentImageUrl} 
              alt="Polycarbonate Canopy Color Combination Preview"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
              key={`${selectedPlate}-${selectedFrame}`}
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide">
              {currentPlateLabel} + {currentFrameLabel}
            </div>
          </div>

          {/* 右侧控制台 */}
          <div className="flex flex-col text-start">
            <h3 className="text-2xl font-bold text-[#184e77] mb-8 pb-4 border-b border-gray-100">{consoleTitle}</h3>

            <div className="mb-8">
              <span className="block text-[15px] font-bold text-gray-400 uppercase tracking-wider mb-3">1. {plateTitle}</span>
              <div className="flex flex-wrap gap-4">
                {plates.map((plate) => {
                  const isActive = selectedPlate === plate.id;
                  return (
                    <button
                      key={plate.id}
                      onClick={() => setSelectedPlate(plate.id)}
                      type="button"
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        isActive ? 'border-[#12b886] bg-[#f0f9f6] shadow-sm' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full inline-block border ${plate.border}`} style={{ backgroundColor: plate.hex }} />
                      <span className={`text-sm font-semibold ${isActive ? 'text-[#12b886]' : 'text-gray-700'}`}>{plate.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="block text-[15px] font-bold text-gray-400 uppercase tracking-wider mb-3">2. {frameTitle}</span>
              <div className="flex flex-wrap gap-4">
                {frames.map((frame) => {
                  const isActive = selectedFrame === frame.id;
                  return (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame.id)}
                      type="button"
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        isActive ? 'border-[#184e77] bg-[#f0f4f8] shadow-sm' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full inline-block border ${frame.border}`} style={{ backgroundColor: frame.hex }} />
                      <span className={`text-sm font-semibold ${isActive ? 'text-[#184e77]' : 'text-gray-700'}`}>{frame.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}