import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories.js";

const BASE_URL = "http://localhost:3000";

export const useWalletStore = defineStore("wallets", {
  state: () => ({
    wallets: [],
    loading: false,
    error: null,
  }),

  getters: {
    getWallets: (state) => state.wallets,
    getWallet: (state) => (walletId) =>
      state.wallets.find((wallet) => wallet.id == walletId),
  },
  actions: {
    async fetchWallets(userId) {
      this.loading = true;
      this.error = null;
      try {
        this.wallets = api.get(BASE_URL, `wallets?owner=${userId}`);
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching wallets:", e);
      } finally {
        this.loading = false;
      }
    },

    async addWallet(name, color, userId) {
      try {
        const walletData = factory.createWallet(name, color, userId);
        return await api.post(BASE_URL, "wallets", walletData);
      } catch (e) {
        (this.error = e.message), console.error("Error adding wallet", e);
        throw e;
      }
    },
  },
});
