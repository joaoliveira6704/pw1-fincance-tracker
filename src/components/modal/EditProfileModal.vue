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
import { comparePassword, encryptPassword } from "@/utils/encrypt";

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
        password: "", // Aqui será a NOVA password
        firstName: "",
        lastName: "",
        income: 0,
        preferences: { private: false },
      },
      lastPassword: "", // O hash que vem da base de dados
      passwordOldInput: "", // O que ele digita no campo "Password Atual"
    };
  },
  watch: {
    isOpen(newVal) {
      if (newVal && this.user) {
        this.localUser = JSON.parse(JSON.stringify(this.user));
        this.lastPassword = this.localUser.password; // Guarda o hash original
        this.localUser.password = ""; // Limpa para o campo da Nova Password
        this.passwordOldInput = ""; // Limpa o campo da Password Atual
        this.errors = [];
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

    async handleSave() {
      this.errors = [];
      const isChangingPassword = this.localUser.password.length > 0;

      if (isChangingPassword) {
        // 1. Validar se ele preencheu a password atual
        if (!this.passwordOldInput) {
          this.errors.push(
            "Insere a password atual para poderes mudar para uma nova."
          );
          return;
        }

        // 2. Comparar o que ele digitou (passwordOldInput) com o hash (lastPassword)
        const isCorrect = await comparePassword(
          this.passwordOldInput,
          this.lastPassword
        );

        if (!isCorrect) {
          this.errors.push("A password atual está incorreta.");
          return;
        }

        // 3. Se está correta, encriptamos a NOVA password (que está em localUser.password)
        this.localUser.password = await encryptPassword(
          this.localUser.password
        );
      } else {
        // Se não quer mudar a pass, mantém o hash antigo
        this.localUser.password = this.lastPassword;
      }

      // ... (restante validação de username e nomes igual ao que tinhas)

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
                v-model="passwordOldInput"
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
