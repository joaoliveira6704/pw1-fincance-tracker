<template>
  <div
    class="min-h-screen w-full flex flex-col items-center bg-main-bg animate-pulse"
  >
    <div class="mt-12 mb-8 text-center px-4">
      <div class="h-10 md:h-12 w-64 bg-border rounded-lg mx-auto mb-3"></div>
      <div class="h-5 w-40 bg-border/40 rounded mx-auto"></div>
    </div>

    <div class="w-full max-w-4xl px-4 md:px-6">
      <div
        class="flex flex-wrap items-center justify-center gap-2 mb-6 py-1.5 px-2 rounded-xl bg-secondary-bg border border-border shadow-sm"
      >
        <div
          v-for="i in 2"
          :key="i"
          class="flex-1 min-w-[110px] h-10 bg-main-bg border border-border/20 rounded-lg"
        ></div>
      </div>

      <div
        class="h-12 w-full max-w-md mx-auto mb-6 rounded-xl bg-secondary-bg border border-border flex items-center px-4 gap-3"
      >
        <div class="h-5 w-5 bg-border rounded-full"></div>
        <div class="h-4 flex-1 bg-border/40 rounded"></div>
      </div>

      <div
        class="w-full bg-secondary-bg rounded-xl border border-border overflow-hidden shadow-sm"
      >
        <div class="h-75 overflow-hidden">
          <table class="w-full border-separate border-spacing-0">
            <thead class="bg-secondary-bg">
              <tr>
                <th
                  v-for="i in 6"
                  :key="i"
                  class="px-6 py-4 border-b-2 border-stackrgreen-500/20"
                >
                  <div class="h-4 w-20 bg-border rounded mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-for="row in 5" :key="row">
                <td v-for="col in 6" :key="col" class="py-5 px-4">
                  <div
                    class="h-4 w-full max-w-[100px] bg-border/30 rounded mx-auto"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full flex justify-end mt-4 p-2">
        <div
          class="h-10 w-40 bg-secondary-bg border border-border rounded-lg"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSkeleton",
};
</script>
