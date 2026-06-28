window.slideDataMap.set(2, `
  <div class="w-[1440px] h-[810px] shadow-2xl relative overflow-hidden slide-bg" style="background: #f8fafc;">
    <!-- 背景装饰 -->
    <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20" style="background: linear-gradient(135deg, #0EA5E9, #3b82f6); filter: blur(80px);"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-15" style="background: linear-gradient(135deg, #F97316, #f59e0b); filter: blur(60px);"></div>
    
    <div class="w-[1350px] h-[720px] mx-auto my-[45px] flex items-center relative z-10">
      <!-- 左侧标题区 -->
      <div class="w-72 flex-shrink-0">
        <div class="inline-block">
          <h2 class="text-6xl font-black text-slate-800 tracking-tight" style="font-family: 'Noto Sans SC', sans-serif;">目录</h2>
          <div class="mt-3 text-lg text-slate-500 font-medium">CONTENTS</div>
          <div class="mt-4 flex gap-2">
            <div class="w-12 h-1.5 rounded-full" style="background:#0EA5E9;"></div>
            <div class="w-6 h-1.5 rounded-full" style="background:#F97316;"></div>
            <div class="w-3 h-1.5 rounded-full" style="background:#10B981;"></div>
          </div>
          <p class="mt-6 text-base text-slate-500 leading-relaxed" style="font-family: 'Noto Sans SC', sans-serif;">今天我们<br>要聊什么</p>
        </div>
      </div>
      
      <!-- 右侧阶梯式章节 -->
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex items-stretch" style="margin-left: 0;">
          <div class="w-20 flex-shrink-0 rounded-l-2xl flex items-center justify-center" style="background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%);">
            <span class="text-3xl font-black text-white">01</span>
          </div>
          <div class="flex-1 bg-white rounded-r-2xl px-6 py-4 flex items-center shadow-lg" style="border: 2px solid #e0f2fe; border-left: none;">
            <div>
              <div class="text-xl font-bold text-slate-800" style="font-family: 'Noto Sans SC', sans-serif;">认识 WorkBuddy</div>
              <div class="text-sm text-slate-500 mt-1" style="font-family: 'Noto Sans SC', sans-serif;">它和普通AI有什么不同？</div>
            </div>
          </div>
        </div>
        
        <div class="flex items-stretch" style="margin-left: 30px;">
          <div class="w-20 flex-shrink-0 rounded-l-2xl flex items-center justify-center" style="background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);">
            <span class="text-3xl font-black text-white">02</span>
          </div>
          <div class="flex-1 bg-white rounded-r-2xl px-6 py-4 flex items-center shadow-lg" style="border: 2px solid #ffedd5; border-left: none;">
            <div>
              <div class="text-xl font-bold text-slate-800" style="font-family: 'Noto Sans SC', sans-serif;">周报 & 业绩分析</div>
              <div class="text-sm text-slate-500 mt-1" style="font-family: 'Noto Sans SC', sans-serif;">数据变洞察，洞察变决策</div>
            </div>
          </div>
        </div>
        
        <div class="flex items-stretch" style="margin-left: 60px;">
          <div class="w-20 flex-shrink-0 rounded-l-2xl flex items-center justify-center" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%);">
            <span class="text-3xl font-black text-white">03</span>
          </div>
          <div class="flex-1 bg-white rounded-r-2xl px-6 py-4 flex items-center shadow-lg" style="border: 2px solid #d1fae5; border-left: none;">
            <div>
              <div class="text-xl font-bold text-slate-800" style="font-family: 'Noto Sans SC', sans-serif;">话术 & 海报创作</div>
              <div class="text-sm text-slate-500 mt-1" style="font-family: 'Noto Sans SC', sans-serif;">一句话生成高质量内容</div>
            </div>
          </div>
        </div>
        
        <div class="flex items-stretch" style="margin-left: 90px;">
          <div class="w-20 flex-shrink-0 rounded-l-2xl flex items-center justify-center" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);">
            <span class="text-3xl font-black text-white">04</span>
          </div>
          <div class="flex-1 bg-white rounded-r-2xl px-6 py-4 flex items-center shadow-lg" style="border: 2px solid #ede9fe; border-left: none;">
            <div>
              <div class="text-xl font-bold text-slate-800" style="font-family: 'Noto Sans SC', sans-serif;">调研 & 运营方案</div>
              <div class="text-sm text-slate-500 mt-1" style="font-family: 'Noto Sans SC', sans-serif;">从问题到方案全链路搞定</div>
            </div>
          </div>
        </div>
        
        <div class="flex items-stretch" style="margin-left: 120px;">
          <div class="w-20 flex-shrink-0 rounded-l-2xl flex items-center justify-center" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);">
            <span class="text-3xl font-black text-white">05</span>
          </div>
          <div class="flex-1 bg-white rounded-r-2xl px-6 py-4 flex items-center shadow-lg" style="border: 2px solid #fef3c7; border-left: none;">
            <div>
              <div class="text-xl font-bold text-slate-800" style="font-family: 'Noto Sans SC', sans-serif;">上手实操 & 进阶技巧</div>
              <div class="text-sm text-slate-500 mt-1" style="font-family: 'Noto Sans SC', sans-serif;">从今天起用起来</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右下角装饰 -->
    <div class="absolute bottom-10 right-16 text-9xl font-black text-slate-200 opacity-40 select-none">05</div>
  </div>
`);
