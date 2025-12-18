<template>
  <div class="bg-[#141414] border border-[#262626] rounded-2xl p-6 mb-6">
    <div class="flex justify-between items-center mb-10">
      <div>
        <h2 class="text-white font-medium">Despesas</h2>
        <p class="text-xs text-gray-500">Total do último mês</p>
      </div>
      <div class="flex bg-black/40 p-1 rounded-lg border border-[#262626]">
        <button
          v-for="filter in timeFilters"
          :key="filter"
          @click="activeFilter = filter"
          :class="[
            'px-4 py-1.5 text-xs rounded-md transition',
            activeFilter === filter
              ? 'bg-[#262626] text-white'
              : 'text-gray-500',
          ]"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <div class="h-64 w-full p-2 relative">
      <svg viewBox="0 0 1000 200" class="w-full h-full">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,160 Q150,210 300,160 T600,110 T1000,130 L1000,200 L0,200 Z"
          fill="url(#chartGrad)"
        />
        <path
          d="M0,160 Q150,210 300,160 T600,110 T1000,130"
          stroke="white"
          stroke-width="1.5"
          fill="none"
          opacity="0.4"
        />
      </svg>
      <div
        class="flex justify-between mt-4 text-[10px] text-gray-600 uppercase tracking-widest px-2"
      >
        <span v-for="n in 7" :key="n">Dez {{ 11 + n }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainChart",
  data() {
    return {
      activeFilter: "Despesas",
      timeFilters: ["Saldo Total", "Despesas", "Objetivos"],
    };
  },
};
</script>
