// src/components/home/Specs.tsx

// 🌟 声明接收外置超级翻译函数 t 和当前语言 lang
interface SpecsProps {
  t: (key: string, subKey?: string) => string;
  lang: string;
}

export default function Specs({ t, lang }: SpecsProps) {
  // 5 大核心参数键名
  const specKeys = ['thickness', 'frame', 'treatment', 'wind', 'temp'];

  return (
    /* 🌟 还原：带有淡淡蓝绿色渐变的背景环境感 */
    <section className="py-20 bg-gradient-to-br from-[#dcf5ed] via-[#f2faf8] to-white px-4">
      <div className="container mx-auto max-w-[800px]">
        
        {/* ================= 模块大标题 ================= */}
        {/* 严格还原带跳转链接的标题结构，并根据当前语言动态拼装路径 */}
        <h3 className="text-[28px] md:text-[32px] font-bold text-center text-[#184e77] mb-12 hover:underline">
          <a href={`/${lang}/products#Aluminum`}>
            {t('title')}
          </a>
        </h3>

        {/* ================= 参数数据表 ================= */}
        <div 
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100"
          aria-label={t('ariaLabel')}
        >
          <table className="w-full border-collapse block">
            <caption className="sr-only">{t('title')}</caption>
            <tbody className="block w-full">
              {specKeys.map((key) => {
                // 🌟 干净解开：Specs -> data -> thickness -> label/value
                const label = t(key, 'label');
                const value = t(key, 'value');

                return (
                  <tr 
                    key={key} 
                    className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0 hover:bg-[#f4fcf9]/50 transition-colors px-2 rounded-md"
                  >
                    {/* 左侧：参数名称 */}
                    <td className="font-semibold text-[#333333] text-[16px] md:text-[18px] border-0 p-0">
                      {label}:
                    </td>
                    
                    {/* 右侧：对应数值 */}
                    <td className="text-gray-600 text-[16px] md:text-[18px] text-right font-medium border-0 p-0">
                      {value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}