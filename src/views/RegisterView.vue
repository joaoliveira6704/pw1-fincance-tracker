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
      usernameList: getUsernameList(),
      usersStore: useUsersStore(),
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      inputValidation: {
        firstName: { valid: null },
        lastName: { valid: null },
        username: { valid: null, isUnique: true, validLength: true },
        email: { notTaken: true, valid: true },
        password: {
          valid: null,
          containsSpecialChar: null,
          containsNum: null,
          validLength: null,
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
      const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
      if (this[field].length > 0)
        this.inputValidation[field].valid = !format.test(this[field]);
      else {
        this.inputValidation[field].valid = null;
      }
    },

    passwordValidation() {
      const specialCharPattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      const numPattern = /[0-9]/;
      const minLength = 6;

      const passwordValue = this.password;
      const passwordObj = this.inputValidation.password;

      passwordObj.containsSpecialChar = specialCharPattern.test(passwordValue);
      passwordObj.containsNum = numPattern.test(passwordValue);
      passwordObj.validLength = passwordValue.length >= minLength;

      passwordObj.valid =
        passwordObj.containsSpecialChar &&
        passwordObj.containsNum &&
        passwordObj.validLength;

      console.log(passwordObj.valid);
    },

    usernameValidation(userList) {
      const minLength = 6;
      `
      `;
      const usernameValue = this.username;
      const usernameObj = this.inputValidation.username;

      usernameObj.isUnique = !userList.contains(usernameValue);
      usernameObj.validLength = usernameValue.length >= minLength;

      usernameObj.valid = usernameObj.isUnique && usernameObj.validLength;

      console.log(userList);
      console.log(usernameObj.valid);
    },

    async getUsernameList() {
      try {
        const userList = await api.get(BASE_URL, "users");
        const usernameList = userList.map((user) => user.username);
        return usernameList;
      } catch (error) {
        console.log(error);
      }
    },
  },

  watch: {
    firstName() {
      this.nameValidation(`firstName`);
    },
    lastName() {
      this.nameValidation(`lastName`);
    },
    username() {
      this.usernameValidation(this.usernameList);
    },
    username() {},
    password() {
      this.passwordValidation();
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
        :is-valid="inputValidation.firstName.valid"
      />
      <RegisterInput
        v-model="lastName"
        label-text="Last Name"
        inputType="text"
        :is-valid="inputValidation.lastName.valid"
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
        :is-valid="inputValidation.password.valid"
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
