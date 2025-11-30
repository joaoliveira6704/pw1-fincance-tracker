<script>
export default {
  props: {
    labelText: {
      type: String,
      default: "Input Label",
    },
    inputType: {
      type: String,
      default: "******",
    },
    variant: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
    },
  },
  methods: {
    onInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
  computed: {
    inputClasses() {
      const base = "flex flex-col gap-y-1";

      const variants = {
        span: "col-span-2",
      };

      return `${base} ${variants[this.variant]}`;
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div :class="inputClasses">
    <label class="ml-1">{{ labelText }} :</label>
    <input
      class="bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50 focus:outline-none"
      :type="inputType"
      :placeholder="labelText"
      @input="onInput"
      @change="checkUniqueUsername"
      autocapitalize="on"
    />
  </div>
</template>

<style lang="scss"></style>
