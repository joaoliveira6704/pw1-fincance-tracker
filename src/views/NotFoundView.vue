<template>
    <main class="items-center flex flex-col relative z-10">
        <LightDarkBtn/>
        <div class="text-5xl max-w-5xl text-center font-ProximaNova mt-30">
            <img src="/404.png" class="mx-auto block" width="600"></img>
            <h1 class="mt-10">
            Oops...<br />Looks like you're in a unknown<br/><span class="text-stackrgreen-500">LAND</span>
            </h1>
        </div>
        <Button variant="full" @click="$router.go(-1)">Go Back</Button>
    </main>
</template>

<script>
import { RouterLink } from "vue-router";
import Button from "@/components/Button.vue";
import LightDarkBtn from "@/components/LightDarkBtn.vue";

export default {
  components: {
    Button,
    LightDarkBtn
  },
};
</script>

<style lang="scss" scoped></style>