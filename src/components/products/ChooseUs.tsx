// src/components/products/ChooseUs.tsx
interface GuaranteeItem {
  title: string;
  detail: string;
}

interface ChooseUsProps {
  heading: string;
  tagline: string;
  lifespanLabel: string;
  lifespanValue: string;
  guarantees: GuaranteeItem[];
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ChooseUs({
  heading,
  tagline,
  lifespanLabel,
  lifespanValue,
  guarantees,
}: ChooseUsProps) {
  return (
    <section className="w-full bg-white py-20 block">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ───── 左侧：标题 + 标语 + 30年高光 ───── */}
          <div className="flex flex-col justify-center">
            <div className="w-12 h-1 bg-[#184e77] mb-6 rounded-full" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-lg md:text-xl text-gray-500 font-light italic">
              {tagline}
            </p>

            {/* 30年寿命高光卡片 */}
            <div className="mt-8 inline-flex items-center gap-4 bg-gradient-to-r from-[#184e77] to-[#1e6b9e] text-white px-6 py-5 rounded-2 rounded-xl shadow-md self-start">
              <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                {lifespanLabel}
              </span>
              <span className="text-xs font-bold text-white/70 px-3 py-0.5 bg-white/20 rounded-full whitespace-nowrap">
                {lifespanValue}
              </span>
            </div>
          </div>

          {/* ───── 右侧：五大保障 Grid ───── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {guarantees.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col gap-2 bg-gray-50 border border-gray-100 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-[#184e77]/20"
              >
                <div className="flex items-start gap-3">
                  <CheckIcon />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}