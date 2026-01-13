<script>
export default {
  name: "AddContributorCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
    contributors: {
      type: Array,
      default: () => [],
    },
    isEdit: { type: Boolean, default: false },
  },
  emits: ["toggle"],
  computed: {
    avatarQuery() {
      console.log(this.user);

      return `https://api.dicebear.com/9.x/identicon/png?seed=${
        this.user.userUsername || this.user.username
      }&scale=70&backgroundColor=#ffffff`;
    },
    isUserContributor() {
      console.log(this.contributors);

      if (!this.contributors) return false;
      return this.contributors.includes(this.user.id);
    },
  },
};
</script>

<template>
  <div
    class="flex gap-4 border border-border bg-navbar-bg px-4 py-3 rounded-xl items-center hover:bg-secondary-bg transition-colors"
    @click="$emit('toggle', user.id)"
  >
    <input
      v-if="isEdit"
      type="checkbox"
      :checked="isUserContributor"
      class="w-4 h-4 accent-stackrgreen-500 cursor-pointer"
      @click.stop
      @change="$emit('toggle', user.id)"
    />
    <img
      :src="avatarQuery"
      :alt="user.userUsername"
      class="h-8 w-8 rounded-full border border-border"
    />
    <div class="flex items-center gap-2">
      <p class="text-sm font-bold text-primary-text">
        {{ user.userName || user.firstName + " " + user.lastName }}
      </p>
      <p class="text-secondary-text text-xs">
        @{{ user.userUsername || user.username }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos se necessário */
</style>
