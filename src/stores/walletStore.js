import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories.js";
import { getUserId } from "@/utils/session";

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
    async fetchWallets() {
      const userId = getUserId();
      if (!userId) return;

      this.loading = true;
      this.error = null;
      try {
        // use an empty array (not an empty string) to avoid UI layout or type issues
        this.wallets = [];
        const data = await api.get(BASE_URL, `wallets?userId=${userId}`);
        this.wallets = data;
      } catch (e) {
        this.error = e.message;
        console.error("Error fetching wallets:", e);
      } finally {
        this.loading = false;
      }
    },

    async removeWallet(id) {
      // Optimistic update: remove locally first for a smooth UI
      const index = this.wallets.findIndex((w) => w.id == id);
      const removed = index !== -1 ? this.wallets.splice(index, 1)[0] : null;
      try {
        await api.remove(BASE_URL, `wallets/${id}`);
      } catch (e) {
        // Revert local change if delete failed
        if (removed) this.wallets.splice(index, 0, removed);
        this.error = e.message;
        console.error("Error removing wallet", e);
        throw e;
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

    async moveBalance(id, amount) {
      const walletData = this.getWallet(id);
      walletData.balance += amount;
      return await api.patch(BASE_URL, `wallets/${id}`, walletData);
    },
  },
});
