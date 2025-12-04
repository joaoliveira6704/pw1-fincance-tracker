<script>
export default {};
</script>

<template>
  <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
  <RouterLink :to="{ name: 'objectives' }">Objetivos</RouterLink>
  <RouterLink :to="{ name: 'expenses' }">Despesas</RouterLink>
  <RouterLink :to="{ name: 'profile' }">Perfil</RouterLink>
  <RouterLink :to="{ name: 'friends' }">Amigos</RouterLink>
  <RouterView />
</template>

<style lang="scss" scoped></style>
