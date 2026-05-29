// src/components/products/ProductsHero.tsx

// 🌟 核心修复：把接口改成直接接收纯字符串数据，彻底抛弃 t 函数！
interface ProductsHeroProps {
  title: string;
  subtitle: string;
  imageAlt: string;
  imageTitle: string;
}

export default function ProductsHero({ title, subtitle, imageAlt, imageTitle }: ProductsHeroProps) {
  return (
    <section className="relative w-full h-[45vh] md:h-[55vh] lg:h-[65vh] flex items-center justify-center bg-gray-900 overflow-hidden">
      
      {/* 🌟 使用标准原生 img 标签，完美继承多语言 Alt 和 Title 
          加上 fetchpriority="high" 告诉浏览器这是王牌主图，优先闪电加载！ 
      */}
      <img
        src="https://img.polycanopy.com/2025/07/polycanopy-sunroom-application-protected-indoor-space-1.jpg"
        alt={imageAlt}      // 直接使用解包后的字符串
        title={imageTitle}  // 直接使用解包后的字符串
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        fetchPriority="high"
        loading="eager"
      />
      
      {/* 黑色半透明遮罩层：降低背景图刺眼感，凸显多语言标题 */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* 核心文字内容层 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          {title} {/* 直接渲染传进来的标题 */}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 font-light drop-shadow-md">
          {subtitle} {/* 直接渲染传进来的副标题 */}
        </p>
      </div>
      
    </section>
  );
}