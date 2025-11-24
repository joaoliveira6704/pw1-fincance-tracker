import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories";
import * as session from "@/utils/session";

const BASE_URL = "http://localhost:3000";

export const useFriendStore = defineStore("friends", {
  state: () => ({
    friends: [],
    availableUsers: [],
  }),

  actions: {
    // Carregar amigos a partir do userId
    async fetchFriends() {
      try {
        const data = await api.get(
          BASE_URL,
          `friends?userId=${session.getUserId()}`
        );
        this.friends = data;
      } catch (e) {
        console.error("Erro ao carregar amigos", e);
      }
    },

    // Carregar todos os users que não são amigos
    async fetchCommunity() {
      const myId = session.getUserId();
      try {
        const allUsers = await api.get(BASE_URL, "users");
        const myFriendsRel = await api.get(BASE_URL, `friends?userId=${myId}`);
        const myFriendIds = myFriendsRel.map((f) => f.friendId);

        this.availableUsers = allUsers.filter(
          (u) => u.id !== myId && !myFriendIds.includes(u.id)
        );
      } catch (e) {
        console.error("Erro ao carregar users", e);
      }
    },

    // Adicionar Amigo
    async addFriend(userObj) {
      const myId = session.getUserId();

      const newFriendship = factory.createFriend(myId, userObj);

      try {
        await api.post(BASE_URL, "friends", newFriendship);
        this.friends.push(newFriendship);
        this.availableUsers = this.availableUsers.filter(
          (u) => u.id !== userObj.id
        );
        return true;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    // Remover Amigo
    async removeFriend(friendshipId) {
      try {
        await api.remove(BASE_URL, `friends/${friendshipId}`);
        this.friends = this.friends.filter((f) => f.id !== friendshipId);
        this.fetchCommunity();
        return true;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
});
