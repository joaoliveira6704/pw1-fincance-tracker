<template>
  <div>Admin Page</div>

  <!-- Table responsive wrapper -->
  <div class="overflow-x-auto">
    <!-- Table -->
    <table class="min-w-full text-left text-sm whitespace-nowrap">
      <!-- Table head -->
      <thead
        class="uppercase tracking-wider border-b-2 dark:border-neutral-600"
      >
        <tr>
          <th scope="col" class="px-6 py-4">First Name</th>
          <th scope="col" class="px-6 py-4">Last Name</th>
          <th scope="col" class="px-6 py-4">Username</th>
          <th scope="col" class="px-6 py-4">Created at</th>
          <th scope="col" class="px-6 py-4">Admin</th>
          <th scope="col" class="px-6 py-4">Delete</th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <AdminTableRow
          v-for="user in users"
          :first-name="user.firstName"
          :last-name="user.lastName"
          :username="user.username"
          :created-at="user.createdAt"
          :is-admin="user.isAdmin"
          :user-id="user.id"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUserId } from "@/utils/session";
import * as api from "@/api/api.js";
import { useUsersStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";
import AdminTableRow from "@/components/adminTableRow.vue";

const BASE_URL = "http://localhost:3000";

export default {
  data() {
    return {};
  },

  components: {
    AdminTableRow,
  },

  computed: {
    ...mapState(useUsersStore, ["users"]),
  },
  methods: {
    ...mapActions(useUsersStore, ["fetchUsers"]),

    async fetch() {
      await this.fetchUsers;
    },
  },

  async mounted() {
    await this.fetch();
  },
};
</script>

<style lang="scss" scoped></style>
