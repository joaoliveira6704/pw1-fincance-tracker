<template>
  <div class="w-full min-h-screen bg-main-bg animate-pulse">
    <div class="max-w-7xl mx-auto px-4 flex flex-col gap-y-10 text-center pt-8">
      <div class="flex flex-col items-center">
        <div class="h-12 md:h-14 w-60 bg-border rounded-lg mb-4"></div>
        <div
          class="h-11 w-44 bg-secondary-bg border border-border rounded-xl"
        ></div>
      </div>

      <div
        class="mt-4 flex flex-col mx-auto items-center justify-center gap-4 rounded-2xl border-2 border-border bg-navbar-bg py-6 px-8 w-full max-w-3xl"
      >
        <div class="h-6 w-48 bg-border rounded"></div>
        <div class="h-10 w-32 bg-border rounded-lg mt-2"></div>
        <div
          class="flex items-center justify-center w-full max-w-lg gap-3 my-2"
        >
          <div class="h-3 w-6 bg-border/40 rounded"></div>
          <div class="h-2 flex-1 bg-border/30 rounded-full"></div>
          <div class="h-3 w-12 bg-border/40 rounded"></div>
        </div>
        <div
          class="h-10 w-40 bg-secondary-bg border border-border rounded-lg mt-2"
        ></div>
      </div>

      <div class="w-full text-left">
        <div
          class="flex flex-col sm:flex-row justify-between items-center md:items-end mb-6 gap-4 border-b border-border pb-6"
        >
          <div class="space-y-3 w-full sm:w-auto">
            <div class="h-10 w-64 bg-border rounded"></div>
            <div class="h-4 w-80 bg-border/40 rounded"></div>
          </div>

          <div
            class="bg-secondary-bg border border-border px-6 py-4 rounded-xl flex items-center gap-4 min-w-[200px]"
          >
            <div class="p-2 bg-border rounded-lg h-10 w-10"></div>
            <div class="space-y-2">
              <div class="h-3 w-20 bg-border/60 rounded"></div>
              <div class="h-6 w-28 bg-border rounded"></div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 overflow-x-auto pb-4 mb-4">
          <div class="h-5 w-5 bg-border/40 rounded-full mr-2"></div>
          <div
            v-for="i in 6"
            :key="i"
            class="h-9 w-24 bg-secondary-bg border border-border rounded-full shrink-0"
          ></div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <div
            v-for="i in 8"
            :key="i"
            class="p-5 rounded-2xl bg-secondary-bg border border-border h-48 flex flex-col"
          >
            <div class="flex justify-between items-start mb-6">
              <div class="h-12 w-12 bg-border rounded-xl"></div>
              <div class="text-right space-y-2">
                <div class="h-6 w-20 bg-border rounded ml-auto"></div>
                <div class="h-2 w-16 bg-border/40 rounded ml-auto"></div>
              </div>
            </div>
            <div class="space-y-2 mb-4 flex-grow">
              <div class="h-5 w-3/4 bg-border rounded"></div>
              <div class="h-3 w-1/2 bg-border/40 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpensesSkeleton",
};
</script>
