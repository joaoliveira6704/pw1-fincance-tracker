<template>
  <div class="w-full min-h-screen bg-main-bg animate-pulse">
    <div class="max-w-7xl mx-auto px-4 flex flex-col gap-y-10 text-center pt-8">
      <div class="flex flex-col items-center">
        <div class="h-12 md:h-14 w-60 bg-border rounded-lg mb-4"></div>
        <div
          class="h-11 w-48 bg-secondary-bg border border-border rounded-xl"
        ></div>
      </div>

      <div class="w-full text-left">
        <div
          class="flex flex-col sm:flex-row justify-between items-center md:items-end mb-6 gap-4 border-b border-border pb-6"
        >
          <div class="space-y-3 w-full sm:w-auto">
            <div class="h-9 w-64 bg-border rounded"></div>
            <div class="h-4 w-80 bg-border/50 rounded"></div>
          </div>

          <div
            class="bg-secondary-bg border border-border px-6 py-4 rounded-xl flex items-center gap-4 min-w-[200px]"
          >
            <div class="p-2 bg-border rounded-full h-10 w-10"></div>
            <div class="space-y-2">
              <div class="h-3 w-12 bg-border/60 rounded"></div>
              <div class="h-7 w-28 bg-border rounded"></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div
            v-for="i in 3"
            :key="i"
            class="p-5 rounded-2xl bg-secondary-bg border border-border h-60 flex flex-col"
          >
            <div class="flex justify-between items-start mb-6">
              <div class="p-3 rounded-xl bg-border h-12 w-12"></div>
              <div class="text-right space-y-2">
                <div class="h-6 w-24 bg-border rounded ml-auto"></div>
                <div class="h-2 w-20 bg-border/50 rounded ml-auto"></div>
              </div>
            </div>

            <div class="mb-6 flex-grow">
              <div class="h-5 w-3/4 bg-border rounded"></div>
            </div>

            <div
              class="mt-auto pt-4 border-t border-border grid grid-cols-3 gap-2"
            >
              <div
                v-for="j in 3"
                :key="j"
                class="h-9 bg-secondary-bg border border-border rounded-lg"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletsSkeleton",
};
</script>
