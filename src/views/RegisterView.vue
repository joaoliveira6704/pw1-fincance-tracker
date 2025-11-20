<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
};
</script>

<template>
  <h1 class="text-stackrgreen-500">Register Page :</h1>

  <h1 class="text-lg">
    Bem vindo
    <span class="text-stackrgreen-200">{{ firstName }} {{ lastName }}</span>
  </h1>
  <form
    class="border m-auto border-stackrgreen-500 flex flex-col w-fit p-10 py-10 gap-y-15 rounded-xl"
  >
    <div class="flex flex-row gap-x-5">
      <div class="flex flex-row gap-x-2">
        <label for="firstName">First Name :</label>
        <input
          class="bg-grey-100 rounded-xl px-1 py-2 focus:bg-[#9e9e9e]/50 focus:outline-none"
          name="firstName"
          type="text"
          v-model="firstName"
          placeholder="  First Name"
          autocapitalize="on"
        />
      </div>

      <label for="lastName">Last Name :</label>
      <input
        class="bg-grey-100 rounded-sm px-1"
        name="lastName"
        type="text"
        v-model="lastName"
        placeholder="Last Name"
        autocapitalize="on"
      />
    </div>
    <div>
      <label for="e-mail">E-mail :</label>
      <input
        class="bg-grey-100 rounded-sm px-1"
        name="e-mail"
        type="text"
        placeholder="you@example.com"
        autocapitalize="on"
      />
    </div>
  </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,718;1,718&display=swap");
</style>
