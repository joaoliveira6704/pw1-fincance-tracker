<script>
import { useUsersStore } from "@/stores/userStore";
import { formattedIncome, getObjectiveData } from "@/utils/utils";
import {
  X,
  Calendar,
  Target,
  Users,
  Info,
  TrendingUp,
  Type,
  AlignLeft,
  User,
} from "lucide-vue-next";
import { mapActions, mapState } from "pinia";
import Button from "../Button.vue";
import { useCategoryStore } from "@/stores/categoryStore";
import RegisterInput from "../RegisterInput.vue";
import { encryptPassword } from "@/utils/encrypt";

export default {
  name: "EditExpenseModal",
  components: {
    X,
    Calendar,
    Target,
    Users,
    Info,
    TrendingUp,
    Type,
    AlignLeft,
    Button,
    RegisterInput,
    User,
  },
  props: {
    isOpen: { type: Boolean, required: true },
    user: { type: Object, default: () => ({}) },
    categories: { type: Array, default: () => [] },
    users: { type: Array, default: () => [] },
  },
  emits: ["close", "save"],
  data() {
    return {
      errors: [],
      localUser: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        income: 0,
        preferences: {
          private: false,
        },
      },
      lastPassword: "",
      passwordInput: "",
    };
  },
  watch: {
    // Whenever modal opens, sync the prop to local state
    isOpen(newVal) {
      if (newVal && this.user) {
        this.localUser = JSON.parse(JSON.stringify(this.user));
        this.lastPassword = this.localUser.password;

        this.localUser.password = "";
      }
    },
  },
  computed: {
    ...mapState(useUsersStore, ["users"]),
    avatarQuery() {
      return `
https://api.dicebear.com/9.x/identicon/png?seed=${this.localUser.username}&scale=70&backgroundColor=#ffffff`;
    },
    isUserNameValid() {
      return this.localUser.username.length > 3;
    },
    isFirstNameValid() {
      return this.localUser.firstName.length > 3;
    },
    isLastNameValid() {
      return this.localUser.lastName.length > 3;
    },
    visibilityLabel() {
      return this.localUser.preferences?.private ? "Privado" : "Público";
    },
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchUsers"]),

    handleSave() {
      if (this.passwordInput === "")
        this.localUser.password === this.lastPassword;
      if (this.users.find((u) => u.username === this.localUser.username)) {
        if (!this.errors.includes("Username já existe"))
          this.errors.push("Username já existe");
        return;
      }
      console.log("Saving profile:", this.localUser);
      this.$emit("save", this.localUser);
    },
  },
  async mounted() {
    await this.fetchUsers();
  },
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click.self="$emit('close')"
    >
      <div
        class="relative w-full max-w-lg bg-secondary-bg rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in"
      >
        <div
          class="flex justify-between items-center p-6 border-b border-border bg-main-bg"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-stackrgreen-500/10 rounded-lg">
              <User class="w-5 h-5 text-stackrgreen-500" />
            </div>
            <h2 class="text-xl font-ProximaNova font-bold text-primary-text">
              Editar Perfil
            </h2>
          </div>
          <button
            @click="$emit('close')"
            class="p-2 text-secondary-text hover:text-primary-text rounded-full transition-colors"
          >
            <X class="w-6 h-6" />
          </button>
        </div>

        <div
          v-if="localUser"
          class="p-8 space-y-6 overflow-y-auto max-h-[70vh]"
        >
          <div class="flex gap-6 items-center">
            <img
              :src="avatarQuery"
              class="border-3 border-border rounded-full w-20 h-20"
            />
            <div class="flex flex-col text-left w-full gap-1">
              <span class=""
                >Username:
                <span class="text-stackrgreen-500"
                  >@{{ localUser.username }}</span
                ></span
              >

              <input
                v-model="localUser.username"
                type="text"
                class="bg-stackrgrey-light/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col text-left w-full gap-1">
              <span class="">Primeiro Nome:</span>

              <input
                v-model="localUser.firstName"
                type="text"
                class="bg-stackrgrey-light/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
              />
            </div>
            <div class="flex flex-col text-left w-full gap-1">
              <span class="">Último Nome:</span>

              <input
                v-model="localUser.lastName"
                type="text"
                class="bg-stackrgrey-light/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
              />
            </div>
          </div>

          <p class="font-bold font-ProximaNova text-lg mb-4 mt-4">
            Alterar Password
          </p>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col text-left w-full gap-1">
              <span class="">Password Atual:</span>

              <input
                v-model="passwordInput"
                type="password"
                class="bg-stackrgrey-light/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
              />
            </div>
            <div class="flex flex-col text-left w-full gap-1">
              <span class="">Nova Password:</span>

              <input
                v-model="localUser.password"
                type="password"
                class="bg-stackrgrey-light/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
              />
            </div>
          </div>

          <div>
            <p class="font-bold font-ProximaNova text-lg mb-4">Preferências</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col text-left w-full gap-1">
                <span class="">Visibilidade:</span>

                <div
                  class="flex items-center gap-3 h-full border border-border px-2 rounded-xl"
                >
                  <input
                    v-model="localUser.preferences.private"
                    type="checkbox"
                    class="bg-stackrgrey-light/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
                  />
                  <p>Privado</p>
                </div>
              </div>
              <div class="flex flex-col text-left w-full gap-1">
                <span class="">Salário:</span>

                <input
                  v-model="localUser.income"
                  type="number"
                  class="bg-stackrgrey-light/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
                />
              </div>
            </div>
          </div>
          <div>
            <p v-for="error in errors" class="text-red-500">{{ error }}</p>
          </div>
        </div>

        <div
          class="p-6 border-t border-border bg-main-bg flex justify-between items-center"
        >
          <span class="text-[10px] text-secondary-text font-medium"
            >ID: {{ user.id?.split("-")[0] }}</span
          >
          <div class="flex gap-3">
            <Button @click="$emit('close')" variant="cancel">Cancelar</Button>
            <Button @click="handleSave" variant="fill"
              >Salvar Alterações</Button
            >
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
