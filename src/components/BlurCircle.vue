<template>
  <div class="circles-container">
    <div class="left-circle"></div>
    <div class="right-circle"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.circles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

.left-circle {
  height: 1000px;
  width: 1000px;
  background-image: radial-gradient(
    closest-side,
    rgb(190, 83, 83),
    var(--color-stackrblack)
  );
  position: absolute;
  top: 0px;
  left: -20%;
  opacity: 0.2;
}

.right-circle {
  height: 800px;
  width: 800px;
  background-image: radial-gradient(
    closest-side,
    rgb(190, 83, 83),
    var(--color-stackrblack)
  );
  position: absolute;
  top: -200px;
  left: 60%;
  opacity: 0.1;
}
</style>
