<template>
  <div class="w-full animate-pulse bg-main-bg">
    <header class="flex flex-col items-center pb-10">
      <div class="h-12 w-64 bg-border rounded-lg mb-4"></div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div
        v-for="i in 3"
        :key="i"
        class="border border-border rounded-2xl p-5 bg-navbar-bg/50 h-44 flex flex-col justify-between"
      >
        <div class="flex justify-between items-start">
          <div class="h-4 w-24 bg-border rounded"></div>
          <div class="h-6 w-16 bg-border/60 rounded-full"></div>
        </div>
        <div class="h-10 w-32 bg-border rounded mt-2"></div>
        <div class="space-y-2 mt-4">
          <div class="h-3 w-full bg-border rounded"></div>
          <div class="h-3 w-2/3 bg-border/40 rounded"></div>
        </div>
      </div>
    </div>

    <div
      class="border border-border rounded-3xl p-6 bg-navbar-bg/50 mb-6 h-48 flex flex-col justify-center"
    >
      <div class="flex items-center gap-2 mb-4">
        <div class="h-8 w-8 bg-border rounded-lg"></div>
        <div class="h-4 w-32 bg-border rounded"></div>
      </div>
      <div class="space-y-3">
        <div class="h-6 w-3/4 bg-border rounded"></div>
        <div class="h-6 w-1/2 bg-border/60 rounded"></div>
      </div>
    </div>

    <div class="border border-border rounded-2xl p-6 bg-navbar-bg/50 mb-6">
      <div
        class="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4"
      >
        <div class="space-y-2">
          <div class="h-5 w-40 bg-border rounded"></div>
          <div class="h-3 w-24 bg-border/40 rounded"></div>
        </div>
        <div class="flex gap-2">
          <div
            v-for="j in 3"
            :key="j"
            class="h-8 w-20 bg-secondary-bg border border-border rounded-md"
          ></div>
        </div>
      </div>
      <div
        class="h-64 w-full bg-secondary-bg/50 rounded-xl border border-border/20"
      ></div>
    </div>

    <div
      class="border border-border rounded-2xl p-6 bg-navbar-bg/50 h-64 flex flex-col"
    >
      <div class="flex justify-between items-center mb-8">
        <div class="space-y-2">
          <div class="h-5 w-32 bg-border rounded"></div>
          <div class="h-3 w-48 bg-border/40 rounded"></div>
        </div>
        <div
          class="h-10 w-32 bg-secondary-bg border border-border rounded-lg"
        ></div>
      </div>
      <div
        class="flex-1 w-full bg-secondary-bg/30 rounded-lg border border-border/10"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardSkeleton",
};
</script>
