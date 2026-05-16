// src/components/home/ColorPicker.tsx
import { useState } from 'react';

// 🌟 明确声明接收外置的超级翻译函数 t
interface ColorPickerProps {
  t: (key: string, subKey?: string) => string;
}

export default function ColorPicker({ t }: ColorPickerProps) {
  // 1. 板材（Polycarbonate Sheet）状态定义
  const plates = [
    { id: 'clear', hex: '#ffffff', border: 'border-gray-300' },
    { id: 'bronze', hex: '#8a5a36', border: 'border-transparent' },
    { id: 'lakeblue', hex: '#008b8b', border: 'border-transparent' },
    { id: 'gray', hex: '#808080', border: 'border-transparent' }
  ];
  const [selectedPlate, setSelectedPlate] = useState('clear');

  // 2. 骨架（Aluminum Frame）状态定义
  const frames = [
    { id: 'white', hex: '#f5f5f5', border: 'border-gray-200' },
    { id: 'black', hex: '#1a1a1a', border: 'border-transparent' },
    { id: 'gray', hex: '#4a4a4a', border: 'border-transparent' },
    { id: 'coffee', hex: '#4b3621', border: 'border-transparent' }
  ];
  const [selectedFrame, setSelectedFrame] = useState('black');

  // 3. 🌟 核心公式：根据选中的“板材+骨架”全自动组合出对应的 CDN 渲染大图路径
  // 举例：clear 板材 + black 骨架 -> clear-black.jpg
  const currentImageUrl = `https://img.polycanopy.com/color-picker/${selectedPlate}-${selectedFrame}.jpg`;

  return (
    <section className="py-20 bg-gray-50 px-4">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* ================= 头部文案 ================= */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] md:text-[38px] font-bold text-[#333333] mb-4">
            {t('global', 'title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            {t('global', 'subtitle')}
          </p>
        </div>

        {/* ================= 主交互网格 ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          
          {/* 左侧：实时动态渲染大图（带丝滑的切换动效） */}
          <div className="w-full relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
            <img 
              src={currentImageUrl} 
              alt="Polycarbonate Canopy Color Combination Preview"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
              key={`${selectedPlate}-${selectedFrame}`} // 利用 key 触发原生的淡入视觉缓冲
            />
            {/* 左上角状态浮标 */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide">
              {t('plateLabels', selectedPlate)} + {t('frameLabels', selectedFrame)}
            </div>
          </div>

          {/* 右侧：调色盘控制台 */}
          <div className="flex flex-col text-start">
            
            {/* ── 控制台大标题 ── */}
            <h3 className="text-2xl font-bold text-[#184e77] mb-8 pb-4 border-b border-gray-100">
              {t('global', 'consoleTitle')}
            </h3>

            {/* ── 维度一：板材颜色选择（Polycarbonate Roof） ── */}
            <div className="mb-8">
              <span className="block text-[15px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                1. {t('global', 'plateTitle')}
              </span>
              <div className="flex flex-wrap gap-4">
                {plates.map((plate) => {
                  const isActive = selectedPlate === plate.id;
                  return (
                    <button
                      key={plate.id}
                      onClick={() => setSelectedPlate(plate.id)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'border-[#10b981] bg-[#f0f9f6] shadow-sm' 
                          : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {/* 彩色圆圈 */}
                      <span 
                        className={`w-5 h-5 rounded-full inline-block border ${plate.border}`}
                        style={{ backgroundColor: plate.hex }}
                      />
                      <span className={`text-sm font-semibold ${isActive ? 'text-[#10b981]' : 'text-gray-700'}`}>
                        {t('plateLabels', plate.id)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── 维度二：骨架颜色选择（Aluminum Frame） ── */}
            <div>
              <span className="block text-[15px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                2. {t('global', 'frameTitle')}
              </span>
              <div className="flex flex-wrap gap-4">
                {frames.map((frame) => {
                  const isActive = selectedFrame === frame.id;
                  return (
                    <button
                      key={frame.id}
                      onClick={() => setSelectedFrame(frame.id)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'border-[#184e77] bg-[#f0f4f8] shadow-sm' 
                          : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {/* 彩色圆圈 */}
                      <span 
                        className={`w-5 h-5 rounded-full inline-block border ${frame.border}`}
                        style={{ backgroundColor: frame.hex }}
                      />
                      <span className={`text-sm font-semibold ${isActive ? 'text-[#184e77]' : 'text-gray-700'}`}>
                        {t('frameLabels', frame.id)}
                      </span>
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