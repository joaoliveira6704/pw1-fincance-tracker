<script>
export default {
  name: "ProfileSkeleton",
};
</script>

<template>
  <div
    class="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border shadow-lg"
    style="
      background-color: var(--main-bg-color);
      border-color: var(--border-color);
    "
  >
    <div class="h-32 w-full animate-pulse bg-gray-500/20"></div>

    <div class="px-6 pb-6">
      <div
        class="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6"
      >
        <div
          class="h-24 w-24 rounded-full border-4 animate-pulse bg-gray-500/20 z-10"
          style="border-color: var(--main-bg-color)"
        ></div>

        <div
          class="mt-4 sm:mt-0 sm:ml-4 flex-1 w-full flex flex-col items-center sm:items-start"
        >
          <div
            class="h-8 w-48 rounded-md animate-pulse bg-gray-500/20 mb-2"
          ></div>
          <div class="h-4 w-24 rounded-md animate-pulse bg-gray-500/20"></div>
        </div>

        <div class="mt-4 sm:mt-0">
          <div class="h-10 w-28 rounded-lg animate-pulse bg-gray-500/20"></div>
        </div>
      </div>

      <hr class="border-t my-4" style="border-color: var(--border-color)" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div
          class="p-4 rounded-xl border flex items-center gap-3 h-20"
          style="border-color: var(--border-color)"
        >
          <div class="size-8 rounded-full animate-pulse bg-gray-500/20"></div>
          <div class="flex-1 space-y-2">
            <div class="h-3 w-16 rounded animate-pulse bg-gray-500/20"></div>
            <div class="h-5 w-32 rounded animate-pulse bg-gray-500/20"></div>
          </div>
        </div>

        <div
          class="p-4 rounded-xl border flex items-center gap-3 h-20"
          style="border-color: var(--border-color)"
        >
          <div class="size-8 rounded-full animate-pulse bg-gray-500/20"></div>
          <div class="flex-1 space-y-2">
            <div class="h-3 w-16 rounded animate-pulse bg-gray-500/20"></div>
            <div class="h-5 w-32 rounded animate-pulse bg-gray-500/20"></div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center gap-2 mb-3">
          <div class="size-5 rounded animate-pulse bg-gray-500/20"></div>
          <div class="h-6 w-20 rounded animate-pulse bg-gray-500/20"></div>
        </div>

        <div class="flex flex-wrap gap-2">
          <div
            class="h-8 w-24 rounded-full animate-pulse bg-gray-500/20 border"
            style="border-color: var(--border-color)"
          ></div>
          <div
            class="h-8 w-20 rounded-full animate-pulse bg-gray-500/20 border"
            style="border-color: var(--border-color)"
          ></div>
          <div
            class="h-8 w-28 rounded-full animate-pulse bg-gray-500/20 border"
            style="border-color: var(--border-color)"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
