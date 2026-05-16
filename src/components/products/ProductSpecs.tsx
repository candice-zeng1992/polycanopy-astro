// src/components/products/ProductSpecs.tsx

// 🌟 重新规划属性：直接接收大标题和已经由 Astro 在服务器端拼装好的纯净规格数组
interface SpecItem {
  id: number;
  title: string;
  desc: string;
}

interface ProductSpecsProps {
  title: string;
  specs: SpecItem[];
}

export default function ProductSpecs({ title, specs }: ProductSpecsProps) {
  return (
    <section className="w-full bg-gray-50 py-16 block">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 版块大标题 */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>

        {/* 四宫格悬浮卡片矩阵 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {specs.map((spec) => (
            <div 
              key={spec.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 规格标题（符合语义降序的 h3） */}
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {spec.title}
                </h3>
                
                {/* 一道优雅的品牌深蓝分割线，完美呼应工厂质感 */}
                <div className="w-12 h-1 bg-[#184e77] mx-auto mb-4 rounded-full" />
              </div>
              
              {/* 规格描述 */}
              <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}