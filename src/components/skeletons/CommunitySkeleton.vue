<template>
  <div
    class="min-h-screen w-full overflow-auto flex flex-col items-center bg-main-bg animate-pulse"
  >
    <div class="mt-12 mb-8 text-center px-4">
      <div class="h-10 md:h-12 w-48 bg-border rounded-lg mx-auto mb-3"></div>
      <div class="h-4 w-64 bg-border/40 rounded mx-auto"></div>
    </div>

    <div class="w-full max-w-4xl px-4 md:px-6">
      <div
        class="flex flex-wrap items-center justify-center gap-2 mb-6 py-1.5 px-2 rounded-xl bg-secondary-bg border border-border"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="flex-1 min-w-[110px] h-10 bg-main-bg border border-border/20 rounded-lg"
        ></div>
      </div>

      <div class="relative w-full max-w-md mx-auto mb-6">
        <div
          class="h-12 w-full rounded-xl bg-secondary-bg border border-border flex items-center px-4 gap-3"
        >
          <div class="h-5 w-5 bg-border rounded-full"></div>
          <div class="h-4 flex-1 bg-border/40 rounded"></div>
        </div>
      </div>

      <div class="space-y-4 mt-6">
        <div class="flex items-center justify-between mb-4 px-2">
          <div class="h-7 w-40 bg-border rounded"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="i in 6"
            :key="i"
            class="flex items-center justify-between p-4 rounded-xl bg-secondary-bg border border-border h-[74px]"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-border"></div>
              <div class="flex flex-col gap-2">
                <div class="h-4 w-24 bg-border rounded"></div>
                <div class="h-3 w-16 bg-border/40 rounded"></div>
              </div>
            </div>

            <div class="h-8 w-20 bg-border/60 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommunitySkeleton",
};
</script>
