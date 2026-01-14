<template>
  <div class="w-full min-h-screen bg-main-bg animate-pulse">
    <div class="w-full mx-auto flex flex-col text-center">
      <div class="h-32 w-full bg-border/40"></div>

      <div class="px-2 sm:px-6 md:px-12 pb-6 pt-3">
        <div
          class="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6"
        >
          <div
            class="h-24 w-24 rounded-full border-4 border-main-bg bg-border z-10"
          ></div>

          <div
            class="mt-6 md:mt-0 md:ml-4 text-center md:text-left flex-1 space-y-2"
          >
            <div class="h-8 w-48 bg-border rounded mx-auto md:mx-0"></div>
            <div class="h-4 w-24 bg-border/50 rounded mx-auto md:mx-0"></div>
          </div>

          <div class="mt-4 md:mt-0 flex gap-2">
            <div
              class="h-10 w-28 bg-secondary-bg border border-border rounded-lg"
            ></div>
            <div
              class="h-10 w-32 bg-secondary-bg border border-border rounded-lg"
            ></div>
          </div>
        </div>

        <hr class="border-t my-2 md:my-4 border-border" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 p-6">
          <div
            v-for="i in 2"
            :key="i"
            class="p-4 rounded-xl border border-border flex items-center gap-3 bg-secondary-bg/30"
          >
            <div class="h-10 w-10 bg-border rounded-lg"></div>
            <div class="space-y-2 text-left">
              <div class="h-3 w-16 bg-border/60 rounded"></div>
              <div class="h-5 w-32 bg-border rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-3xl mx-auto px-5 mt-4">
      <div class="flex items-center justify-center md:justify-start gap-2 mb-6">
        <div class="h-6 w-6 bg-border rounded-full"></div>
        <div class="h-6 w-40 bg-border rounded"></div>
      </div>

      <div v-for="group in 2" :key="group" class="mb-8 space-y-4">
        <div class="h-4 w-20 bg-border/40 rounded mb-4"></div>

        <div
          v-for="item in 3"
          :key="item"
          class="flex items-center gap-4 p-4 rounded-xl bg-secondary-bg border border-border"
        >
          <div class="h-11 w-11 rounded-full bg-border shrink-0"></div>

          <div class="grow space-y-2">
            <div class="h-4 w-3/4 bg-border rounded"></div>
            <div class="h-3 w-1/4 bg-border/50 rounded"></div>
          </div>

          <div class="h-5 w-16 bg-border rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSkeleton",
};
</script>
