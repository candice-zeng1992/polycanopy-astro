// src/components/products/ProductsHero.tsx

// 🌟 声明接收外置的超级翻译函数 t
interface ProductsHeroProps {
  t: (key: string) => string;
}

export default function ProductsHero({ t }: ProductsHeroProps) {
  return (
    <section className="relative w-full h-[45vh] md:h-[55vh] lg:h-[65vh] flex items-center justify-center bg-gray-900 overflow-hidden">
      
      {/* 🌟 完美转生：使用标准原生 img 标签，完美继承多语言 Alt 和 Title
        加上 fetchpriority="high" 告诉浏览器这是王牌主图，优先闪电加载！
      */}
      <img
        src="https://img.polycanopy.com/2025/07/polycanopy-sunroom-application-protected-indoor-space-1.jpg"
        alt={t('imageAlt')}
        title={t('imageTitle')}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        // 🌟 换成小驼峰写法，TypeScript 瞬间心满意足，红线直接熄灭！
fetchPriority="high"
        loading="eager"
      />

      {/* 黑色半透明遮罩层：降低背景图刺眼感，凸显多语言标题 */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 核心文字内容层 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          {t('title')}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 font-light drop-shadow-md">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}