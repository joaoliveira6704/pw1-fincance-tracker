<script>
import Button from "@/components/Button.vue";
import RegisterInput from "@/components/RegisterInput.vue";
import { useAuthStore } from "@/stores/authStore";
import { useUsersStore } from "@/stores/userStore";
import * as api from "@/api/api.js";
import { encryptPassword } from "@/utils/encrypt";
const BASE_URL = "http://localhost:3000";

export default {
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      encryptedPassword: "",
      usersStore: useUsersStore(),
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      helpText: false,
      inputValidation: {
        firstName: { valid: null },
        lastName: { valid: null },
        username: { valid: null, isUnique: null, validLength: null },
        email: { notTaken: null, valid: null },
        password: {
          valid: null,
          containsSpecialChar: null,
          containsNum: null,
          validLength: null,
        },
        passwordConfirmation: {
          valid: null,
        },
      },
    };
  },

  methods: {
    async handleLogin() {
      try {
        this.error = null;
        await this.authStore.login(this.username, this.encryptedPassword);
        router.push("/main");
      } catch (err) {
        this.error = "Erro: Credenciais erradas.";
      }
    },

    async addNewUser() {
      this.encryptedPassword = await encryptPassword(this.password);
      await this.usersStore.addUser(
        this.username,
        this.firstName,
        this.lastName,
        this.email,
        this.encryptedPassword
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
    emailValidation() {
      const format = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/;
      if (this.email.length > 0)
        this.inputValidation.email.valid = format.test(this.email);
      else {
        this.inputValidation.email.valid = null;
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

    passwordMatchValidation() {
      const passwordInput = this.password;
      if (this.confirmPassword.length > 0) {
        this.inputValidation.passwordConfirmation.valid =
          passwordInput === this.confirmPassword;
        console.log(this.inputValidation.passwordConfirmation.valid);
      } else {
        this.inputValidation.passwordConfirmation.valid = null;
      }
    },

    async usernameValidation() {
      const minLength = 6;
      const usernameValue = this.username;
      const usernameObj = this.inputValidation.username;
      try {
        const data = await api.get(BASE_URL, `users?username=${usernameValue}`);
        console.log(data);

        usernameObj.isUnique = data.length == 0;
      } catch (e) {
        console.log(e, "Error retrieving data");
      }

      usernameObj.validLength = usernameValue.length >= minLength;

      usernameObj.valid = usernameObj.isUnique && usernameObj.validLength;
    },

    helpTextHandler() {
      this.helpText = !this.helpText;
      console.log(this.helpText);
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
      this.usernameValidation();
    },

    email() {
      this.emailValidation();
    },

    password() {
      this.passwordValidation();
      this.passwordMatchValidation();
    },

    confirmPassword() {
      this.passwordMatchValidation();
    },
  },

  components: {
    Button,
    RegisterInput,
  },
};
</script>

<template>
  <!-- WRAPPER -->
  <div class="flex h-screen gap-5">
    <!-- title wrapper -->
    <div class="flex flex-col pt-5 absolute">
      <h1 class="text-4xl m-auto">
        Bem vind@
        <h1 class="text-stackrgreen-200 text-8xl">
          {{ firstName }} <br />
          {{ lastName }}
        </h1>
      </h1>
    </div>

    <!-- form -->
    <form
      class="relative m-auto bg-white text-black flex flex-col w-200 h-fit p-10 py-10 justify-between rounded-xl"
    >
      <i
        @click="this.helpTextHandler()"
        class="pi pi-question-circle absolute right-5 top-5"
        style="font-size: 1.5rem"
      ></i>

      <!-- grid setup -->
      <div id="grid" class="grid grid-cols-2 grid-rows-4 gap-x-5 gap-y-1">
        <RegisterInput
          v-model="firstName"
          label-text="First Name"
          length="12"
          :is-valid="inputValidation.firstName.valid"
        />

        <RegisterInput
          v-model="lastName"
          label-text="Last Name"
          length="12"
          :is-valid="inputValidation.lastName.valid"
        />
        <RegisterInput
          v-model="email"
          label-text="E-mail"
          inputType="email"
          variant="span"
          :is-valid="inputValidation.email.valid"
        />
        <RegisterInput
          v-model="username"
          label-text="Username"
          length="20"
          variant="span"
          :is-valid="inputValidation.username.valid"
        />

        <RegisterInput
          v-model="password"
          label-text="Password"
          inputType="password"
          :is-valid="inputValidation.password.valid"
          length="12"
        />

        <RegisterInput
          v-model="confirmPassword"
          label-text="Confirm Password"
          inputType="password"
          :is-valid="inputValidation.passwordConfirmation.valid"
        />
      </div>
      <hr class="mt-5" />
      <div v-if="this.helpText" class="mt-5 text-sm text-black/75">
        <p>First and Last name : can´t contain special characters</p>
        <p>Username : must be unique</p>
        <p>
          Password : must be at least 6 characters long and contain a number and
          a special character
        </p>
      </div>
      <Button variant="full" @click="addNewUser()" class="m-auto"
        >Criar conta</Button
      >
    </form>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,718;1,718&display=swap");
</style>
