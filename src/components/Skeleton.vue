<template>
  <div class="flex items-center gap-2">
    <div
      class="size-16 animate-pulse rounded-full bg-neutral-600/30 dark:bg-neutral-300 /30"
      aria-hidden="true"
    ></div>
    <div class="flex w-52 flex-col gap-2">
      <div
        class="h-3.5 w-full animate-pulse rounded-sm bg-neutral-600/30 dark:bg-neutral-300 /30"
        aria-hidden="true"
      ></div>
      <div
        class="h-3.5 w-1/2 animate-pulse rounded-sm bg-neutral-600/30 dark:bg-neutral-300 /30"
        aria-hidden="true"
      ></div>
    </div>
    <span class="sr-only">loading</span>
  </div>
</template>

<script>
export default {
  name: "ProfileSkeleton",
};
</script>
