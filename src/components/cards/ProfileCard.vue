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
    class="w-full mx-auto flex flex-col text-center transition-all ease-in-out duration-700"
    style="background-color: var(--main-bg); border-color: var(--border)"
  >
    <div
      class="h-32 w-full bg-linear-to-r from-stackrgreen-500 to-emerald-700"
    ></div>

    <div class="px-2 sm:px-6 md:px-12 pb-6 pt-3">
      <div
        class="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6"
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

        <div class="mt-6 md:mt-0 md:ml-4 text-center md:text-left flex-1">
          <h2
            class="text-2xl font-bold font-ProximaNova-800 flex items-center justify-center md:justify-start gap-2"
          >
            {{ user.firstName }} {{ user.lastName }}
          </h2>
          <p
            class="opacity-70 flex items-center justify-center md:justify-start gap-1"
          >
            @{{ user.username }}
          </p>
        </div>

        <div class="mt-4 md:mt-0 flex gap-2" v-if="!$route.params.username">
          <Button variant="fill" @click="$emit('edit')">Editar Perfil</Button>
          <Button variant="cancel" @click="logout">Terminar Sessão</Button>
        </div>
      </div>

      <hr class="border-t my-2 md:my-4" style="border-color: var(--border)" />

      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 p-6 mb-0 md:mb-6"
      >
        <div
          class="p-4 rounded-xl border flex items-center gap-3"
          style="border-color: var(--border)"
        >
          <Calendar :size="24" color="var(--color-stackrgreen-500)" />
          <div>
            <p
              class="text-xs opacity-60 text-left uppercase font-bold tracking-wider"
            >
              Entrou em
            </p>
            <p class="font-medium">{{ formattedDate(user.createdAt) }}</p>
          </div>
        </div>

        <div
          class="p-4 rounded-xl border flex items-center gap-3"
          style="border-color: var(--border)"
        >
          <Wallet :size="24" color="var(--color-stackrgreen-500)" />
          <div>
            <p
              class="text-xs text-left opacity-60 uppercase font-bold tracking-wider"
            >
              Salário
            </p>
            <p class="font-medium">{{ formattedIncome(user.income) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
