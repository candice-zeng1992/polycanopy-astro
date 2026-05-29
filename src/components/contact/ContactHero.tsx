import React from 'react';

interface ContactHeroProps {
  title: string;
  subtitle: string;
}

export default function ContactHero({ title, subtitle }: ContactHeroProps) {
  return (
    <section className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* 真实背景大图 */}
      <img 
        src="https://img.polycanopy.com/2025/07/Large-Polycarbonate-Canopy-at-Parking-Lot-Exit.jpg" 
        alt="Polycarbonate Canopy at Parking Lot" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 品牌深蓝色叠加层，增加文字可读性与高级感 */}
      <div className="absolute inset-0 bg-[#184e77]/70 mix-blend-multiply"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-sm">
          {subtitle}
        </p>
      </div>
    </section>
  );
}