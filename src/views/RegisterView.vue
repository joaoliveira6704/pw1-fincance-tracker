<script>
import Button from "@/components/Button.vue";
import RegisterInput from "@/components/RegisterInput.vue";
import { useAuthStore } from "@/stores/authStore";
import { useUsersStore } from "@/stores/userStore";
import * as api from "@/api/api.js";
const BASE_URL = "http://localhost:3000";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      usersStore: useUsersStore(),
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      inputValidation: {
        firstName: { valid: null },
        lastName: { valid: true },
        username: { isUnique: true, validLength: true },
        email: { notTaken: true, valid: true },
        password: {
          valid: false,
          containsSpecialChar: false,
          containsNum: true,
          validLength: true,
        },
        passwordConfirmation: {
          valid: true,
        },
      },
    };
  },
  methods: {
    async handleLogin() {
      try {
        this.error = null;
        await this.authStore.login(this.username, this.password);
        router.push("/main");
      } catch (err) {
        this.error = "Erro: Credenciais erradas.";
      }
    },

    async addNewUser() {
      await this.usersStore.addUser(
        this.username,
        this.firstName,
        this.lastName,
        this.email,
        this.password
      );
      await this.handleLogin();
    },

    nameValidation(field) {
      console.log(this[field].length);
      const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
      if (this[field].length > 0)
        this.inputValidation[field].valid = !format.test(this[field]);
      else {
        this.inputValidation[field].valid = null;
      }
      console.log(this.inputValidation.password.containsNum);
      return this.isFieldValid(field);
    },

    passwordValidation() {
      const specialCharPattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const numPattern = /[0-9]/;
      const minLength = 6;

      const passwordValue = this.password;
      this.inputValidation.password.containsSpecialChar =
        specialCharPattern.test(passwordValue);

      this.inputValidation.password.containsNum =
        numPattern.test(passwordValue);
      this.inputValidation.password.validLength =
        passwordValue.length >= minLength;
    },

    async isUniqueUsername() {
      try {
        const userList = await api.get(BASE_URL, "users");
        const usernameList = userList.map((user) => user.username);
        return !usernameList.includes(this.username);
      } catch (error) {
        console.log(error);
      }
    },

    isFieldValid(field) {
      const out = Object.keys(this.inputValidation[field]).every(
        (value) => this.inputValidation[field][value]
      );

      console.log(out);

      return Object.keys(this.inputValidation[field]).every(
        (value) => this.inputValidation[field][value]
      );
    },

    returnClass() {
      return true;
    },
  },
  components: {
    Button,
    RegisterInput,
  },
};
</script>

<template>
  <h1 class="text-stackrgreen-500">Register Page :</h1>

  <h1 class="text-lg">
    Bem vindo
    <span class="text-stackrgreen-200"
      >{{ firstName }} {{ lastName }} {{ password }} {{ confirmPassword }}
      {{ email }} {{ username }}
    </span>
  </h1>
  <form
    class="m-auto bg-white text-black flex flex-col w-fit p-10 py-10 gap-y-15 rounded-xl"
  >
    <div id="grid" class="grid grid-cols-2 grid-rows-4 gap-x-10 gap-y-10">
      <!-- grid setup -->
      <RegisterInput
        v-model="firstName"
        label-text="First Name"
        inputType="text"
        @input="nameValidation('firstName')"
        :is-valid="inputValidation.password"
      />
      <RegisterInput
        v-model="lastName"
        label-text="Last Name"
        inputType="text"
      />
      <RegisterInput
        v-model="email"
        label-text="E-mail"
        inputType="email"
        variant="span"
      />
      <RegisterInput
        v-model="username"
        label-text="Username"
        inputType="text"
        variant="span"
      />
      <RegisterInput
        v-model="password"
        label-text="Password"
        inputType="password"
      />
      <RegisterInput
        v-model="confirmPassword"
        label-text="Confirm Password"
        inputType="password"
      />
      <!-- <h1 class="text-red-300" v-if="isPasswordValid">
        Password must contain special characters <i class="pi pi-times"></i>
      </h1>
      <h1 class="text-green-300" v-else>
        Password is valid <i class="pi pi-times"></i>
      </h1> -->
    </div>
    <Button variant="full" @click="addNewUser()">Register</Button>
  </form>
  <button @click="isFieldValid('password')">teste</button>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,718;1,718&display=swap");
</style>
