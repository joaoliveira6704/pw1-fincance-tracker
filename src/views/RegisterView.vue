<script>
import { useUsersStore } from "@/stores/usersStore";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      password: "",
    };
  },
};

let text = "Visit W3Schools";
let n = text.match(/4/i);
console.log(n);
</script>

<template>
  <h1 class="text-stackrgreen-500">Register Page :</h1>

  <h1 class="text-lg">
    Bem vindo
    <span class="text-stackrgreen-200">{{ firstName }} {{ lastName }}</span>
  </h1>
  <form
    class="m-auto bg-white text-black flex flex-col w-fit p-10 py-10 gap-y-15 rounded-xl"
  >
    <div class="grid grid-cols-2 grid-rows-4 gap-x-5 gap-y-5">
      <!-- grid setup -->
      <div class="flex flex-col gap-y-2">
        <label for="firstName">First name :</label>
        <input
          class="bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 focus:outline-none"
          name="firstName"
          type="text"
          v-model="firstName"
          placeholder="First Name"
          autocapitalize="on"
        />
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="lastName">Last name :</label>
        <input
          class="bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 focus:outline-none"
          name="lastName"
          type="text"
          v-model="lastName"
          placeholder="Last Name"
          autocapitalize="on"
        />
      </div>
      <div class="flex flex-col gap-y-2 col-span-2">
        <label for="e-mail">E-mail :</label>
        <input
          class="bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 focus:outline-none"
          name="e-mail"
          type="text"
          placeholder="you@example.com"
          autocapitalize="on"
        />
      </div>
      <div class="flex flex-col gap-y-2 col-span-2">
        <label for="username">Username :</label>
        <div class="flex flex-row flex-justify-center gap-2">
          <input
            class="bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 focus:outline-none grow"
            name="username"
            type="text"
            placeholder="username"
            autocapitalize="on"
          />
          <p>icon</p>
        </div>
      </div>
      <div class="flex flex-col gap-y-2">
        <label for="password">Password :</label>
        <input
          class="bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 focus:outline-none"
          name="firstName"
          type="password"
          v-model="password"
          placeholder="*******"
          autocapitalize="on"
        />
      </div>
    </div>
  </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,718;1,718&display=swap");
</style>
