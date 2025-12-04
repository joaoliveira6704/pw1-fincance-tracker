<script>
export default {
  props: {
    labelText: {
      type: String,
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
    isValid: {
      type: Boolean,
    },
    length: {
      type: Number,
    },
  },
  methods: {
    onInput(e) {
      this.$emit("update:modelValue", e.target.value);
      this.$emit("input", e);
    },
  },

  computed: {
    divClass() {
      const base = "flex flex-col gap-y-1 p-2";

      const variants = {
        span: "col-span-2",
      };

      return `${base} ${variants[this.variant]}`;
    },

    inputClass() {
      if (this.isValid === null) {
        return `outline-1 outline-gray-500 focus:outline-1`;
      } else if (this.isValid) {
        return `outline-1 outline-green-500 focus:outline-1`;
      } else {
        return `outline-1 outline-red-500 focus:outline-1`;
      }
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div :class="divClass">
    <label class="ml-1">{{ labelText }} :</label>
    <input
      class="bg-[#9e9e9e]/50 rounded-xl px-3 py-2 hover:bg-[#C5C4CB]/50 focus:bg-[#C5C4CB]/50"
      :class="inputClass"
      :type="inputType"
      :placeholder="labelText"
      @input="onInput"
      :maxlength="length"
    />
  </div>
</template>

<style lang="scss"></style>
