<script>
export default {
  name: "EditCategoryModal",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click.self="closeModal"
    >
      <button @click="" class="absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <div class="flex items-center gap-2">
            <div class="p-2 bg-stackrgreen-500/10 rounded-lg">
              <Wallet class="w-5 h-5 text-stackrgreen-500" />
            </div>
            <h2 class="text-xl font-ProximaNova font-bold text-primary-text">
              Nova Carteira
            </h2>
          </div>
          <button
            @click="closeModal"
            class="p-2 text-secondary-text hover:text-primary-text hover:bg-main-bg rounded-full transition-colors"
          >
          <input
            id="walletName"
            type="text"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-inner-circle focus:border-stackr-green outline-none"
            required
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="initialAmount" class="text-sm font-medium"
            >Quantidade Inicial</label
          >
          <input
            id="initialAmount"
            type="number"
            step="0.01"
            min="0"
            class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="walletColor" class="text-sm font-medium"
            >Cor da Carteira</label
          >
          <div class="flex items-center gap-3">
            <input
              id="walletColor"
              type="color"
              v-model="form.color"
              class="h-10 w-20 rounded cursor-pointer"
            />
          </div>

        <div class="flex justify-end gap-3 mt-4">
          <Button variant="outline" @click=""> Cancelar </Button>
          <Button
            variant="fill"
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Criar Carteira
          </Button>
        </div>
      </form>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes scale-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-scale-in {
  animation: scale-in 0.2s ease-out forwards;
}
</style>
