import { defineStore } from "pinia";
import * as api from "@/api/api.js";
import * as factory from "@/utils/factories";
import * as session from "@/utils/session";

const BASE_URL = "http://localhost:3000";

export const useFriendStore = defineStore("friends", {
  state: () => ({
    following: [],
    followers: [],
    availableUsers: [],
  }),

  actions: {
    // Carregar amigos a partir do userId
    async fetchFollowing() {
      try {
        const data = await api.get(
          BASE_URL,
          `friends?userId=${session.getUserId()}`
        );
        this.following = data;
      } catch (e) {
        console.error("Erro ao carregar amigos", e);
      }
    },

    // Carregar amigos a partir do userId
    async fetchFollowers() {
      try {
        const data = await api.get(
          BASE_URL,
          `friends?friendId=${session.getUserId()}`
        );
        this.followers = data;
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
        console.log(myFriendsRel);

        const myFriendIds = myFriendsRel.map((f) => f.friendId);

        this.availableUsers = allUsers.filter(
          (u) => u.id !== myId && !myFriendIds.includes(u.id)
        );
      } catch (e) {
        console.error("Erro ao carregar users", e);
      }
    },

    // Follow someone
    async addFollowing(currentUserObj, friendObj) {
      const newFriendship = factory.createFriend(currentUserObj, friendObj);
      console.log(friendObj);

      try {
        await api.post(BASE_URL, "friends", newFriendship);
        this.following.push(newFriendship);
        this.availableUsers = this.availableUsers.filter(
          (u) => u.id !== friendObj.id
        );
        return true;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },

    // Remover Amigo
    async removeFriendship(friendshipId) {
      try {
        await api.remove(BASE_URL, `friends/${friendshipId}`);
        this.following = this.following.filter((f) => f.id !== friendshipId);
        this.fetchCommunity();
        return true;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  },
});
