<script>
import { UserPlus, UserMinus } from "lucide-vue-next";

export default {
  name: "UserCard",
  components: { UserPlus, UserMinus },
  props: {
    name: { type: String, required: true },
    username: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    actionType: {
      type: String,
      default: "add",
      validator: (value) => ["add", "remove"].includes(value),
    },
  },
  emits: ["action"],
};
</script>

<template>
  <div
    class="flex items-center cursor-pointer justify-between p-4 rounded-xl bg-(--secondary-bg) border border-(--border) hover:border-stackrgreen-500/50 transition-colors group"
    @click="$router.push(`profile/${username}`)"
  >
    <div class="flex items-center gap-3">
      <img
        class="w-10 h-10 rounded-full border-border border-2"
        :src="avatarUrl"
        :alt="username"
      />
      <div class="flex flex-col">
        <span
          class="font-bold font-ProximaNova text-(--primary-text) text-sm md:text-[16px]"
          >{{ name }}</span
        >
        <span class="text-xs text-(--secondary-text)">@{{ username }}</span>
      </div>
    </div>

    <button
      @click.stop="$emit('action')"
      class="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors"
      :class="
        actionType === 'add'
          ? 'text-green-600 bg-green-500/10 hover:bg-green-600 hover:text-white'
          : 'text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white'
      "
    >
      <UserPlus v-if="actionType === 'add'" class="w-4 h-4" />
      <UserMinus v-else class="w-4 h-4" />
      <span class="max-[400px]:hidden">{{
        actionType === "add" ? "Adicionar" : "Remover"
      }}</span>
    </button>
  </div>
</template>
