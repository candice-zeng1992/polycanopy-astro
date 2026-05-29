import React from 'react';

interface ServiceProcessProps {
  title: string;
  steps: string[]; // 接收传入的 9 个步骤翻译字符串
}

export default function ServiceProcess({ title, steps }: ServiceProcessProps) {
  // 为 9 个步骤精选对应的工业/贸易级轻量 SVG 图标
  const icons = [
    // 1. 咨询 Consult (对话框图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
    // 2. 选型 Determine Style (设计尺子图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.243.58 1.824l-3.97 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.888a1 1 0 00-1.176 0l-3.97 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.97-2.888c-.779-.58-.38-1.824.58-1.824h4.907a1 1 0 00.95-.69l1.519-4.674z"/></svg>,
    // 3. 方案 Confirm Solution (图纸/方案图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
    // 4. 定金 Deposit Payment (定金/卡片图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>,
    // 5. 生产 Production (大厂精密齿轮/制造图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>,
    // 6. 尾款 Final Payment (安全结算对勾图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    // 7. 发货 Shipping (集装箱卡车/国际海运物流图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 5H1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 9h4l3 3v4h-7V9z"/></svg>,
    // 8. 收货 Customer Receipt (客户开箱签收图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
    // 9. 售后 After-sales (全天候保障徽章图标)
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 板块大标题 */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight relative inline-block">
            {title}
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-[#12b886] -mb-3 rounded-full"></span>
          </h2>
        </div>

        {/* 响应式时间轴网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-4 relative">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const stepLabel = `Step ${index + 1}: ${step}`;
            
            return (
              <div key={index} className="relative flex flex-col items-center group">
                {/* 外层包裹节点加上标准的 aria-label，告诉爬虫这是第几步，内容是什么。
                  同时加上拥有交互语义的 role="text"，保证屏幕阅读器能够完美识别。
                */}
                <div 
                  className="w-12 h-12 rounded-full bg-[#184e77]/5 border-2 border-[#184e77]/20 flex items-center justify-center font-bold text-[#184e77] group-hover:bg-[#12b886] group-hover:text-white group-hover:border-[#12b886] transition-all duration-300 shadow-sm z-10"
                  aria-label={stepLabel}
                  role="img"
                >
                  {/* Hover 前显示高清晰度专业 SVG 图标，Hover 后变为数字，极具动感 */}
                  <span className="block group-hover:hidden transition-all duration-200">
                    {icons[index] || (index + 1)}
                  </span>
                  <span className="hidden group-hover:block text-base font-extrabold transition-all duration-200">
                    {index + 1}
                  </span>
                </div>

                {/* 卡片式步骤文案 */}
                <div className="mt-4 text-center p-3 rounded-xl bg-gray-50 border border-gray-100 w-full group-hover:bg-white group-hover:shadow-md group-hover:border-[#12b886]/20 transition-all duration-300">
                  <p className="text-sm font-bold text-gray-800 tracking-tight break-words">
                    {step}
                  </p>
                </div>

                {/* lg大屏幕下的横向连接箭头 */}
                {!isLast && (
                  <div 
                    className="hidden lg:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[2px] bg-gray-200 group-hover:bg-[#12b886]/40 transition-colors duration-300"
                    aria-hidden="true" // 装饰性线条，对阅读器隐藏，避免造成杂音
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-gray-300 rotate-45 group-hover:border-[#12b886] transition-colors duration-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}