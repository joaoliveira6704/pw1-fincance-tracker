<script>
import { formattedDate, formattedIncome } from "@/utils/utils";
import { Calendar, Wallet, User, Users } from "lucide-vue-next";
import Button from "../Button.vue";

export default {
  name: "ProfileCard",
  components: {
    Calendar,
    Wallet,
    User,
    Users,
    Button,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Unique avatar by username seed (github style)
    avatarQuery() {
      return `
https://api.dicebear.com/9.x/identicon/png?seed=${this.user.username}&scale=70&backgroundColor=#ffffff`;
    },
  },
  methods: {
    formattedDate,
    formattedIncome,
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<template>
  <div
    class="w-full mx-auto flex flex-col text-center items-center overflow-hidden border shadow-lg transition-colors duration-200"
    style="
      background-color: var(--main-bg-color);
      border-color: var(--border-color);
    "
  >
    <div
      class="h-32 w-full bg-gradient-to-r from-[var(--color-stackrgreen-500)] to-emerald-700"
    ></div>

    <div class="px-6 sm:px-12 pb-6 pt-3">
      <div
        class="flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-6"
      >
        <img
          class="h-24 w-24 rounded-full border-4 flex items-center justify-center font-bold shadow-md z-10 bg-gray-200"
          style="
            border-color: var(--color-stackrgreen-500);
            background-color: white;
          "
          :src="avatarQuery"
          alt="User Avatar"
        />

        <div class="mt-6 sm:mt-0 sm:ml-4 text-center sm:text-left flex-1">
          <h2
            class="text-2xl font-bold font-ProximaNova-Bold flex items-center justify-center sm:justify-start gap-2"
          >
            {{ user.firstName }} {{ user.lastName }}
          </h2>
          <p
            class="opacity-70 flex items-center justify-center sm:justify-start gap-1"
          >
            @{{ user.username }}
          </p>
        </div>

        <div class="mt-4 sm:mt-0">
          <button
            class="px-4 py-2 rounded-lg font-bold text-sm transition-opacity hover:opacity-80 flex items-center gap-2"
            style="
              background-color: var(--color-stackrgreen-500);
              color: var(--color-stackrblack);
            "
          >
            Edit Profile
          </button>
        </div>
      </div>

      <hr class="border-t my-4" style="border-color: var(--border-color)" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div
          class="p-4 rounded-xl border flex items-center gap-3"
          style="border-color: var(--border-color)"
        >
          <Calendar :size="24" color="var(--color-stackrgreen-500)" />
          <div>
            <p class="text-xs opacity-60 uppercase font-bold tracking-wider">
              Entrou em
            </p>
            <p class="font-medium">{{ formattedDate(user.createdAt) }}</p>
          </div>
        </div>

        <div
          class="p-4 rounded-xl border flex items-center gap-3"
          style="border-color: var(--border-color)"
        >
          <Wallet :size="24" color="var(--color-stackrgreen-500)" />
          <div>
            <p class="text-xs opacity-60 uppercase font-bold tracking-wider">
              Salário
            </p>
            <p class="font-medium">{{ formattedIncome(user.income) }}</p>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center gap-2 mb-3">
          <Users :size="20" class="opacity-70" />
          <h3 class="text-lg font-bold font-ProximaNova-Bold">Amigos</h3>
        </div>

        <div
          v-if="user.friends && user.friends.length"
          class="flex flex-wrap gap-2"
        >
          <span
            v-for="friend in user.friends"
            :key="friend"
            class="px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-2"
            style="
              background-color: var(--navbar-bg-color);
              border-color: var(--border-color);
            "
          >
            <User :size="14" />
            {{ friend }}
          </span>
        </div>

        <div v-else class="text-center py-4 opacity-60 italic text-sm">
          Sem amigos adicionados ainda.
        </div>
      </div>
    </div>
    <div class="max-w-3xl pb-6">
      <Button variant="outline" @click="logout">Logout</Button>
    </div>
  </div>
</template>

<style scoped>
.font-ProximaNova-Bold {
  font-family: var(--font-ProximaNova-Bold), sans-serif;
}
</style>
