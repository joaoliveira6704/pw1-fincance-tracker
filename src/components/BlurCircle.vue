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

.left-circle,
.right-circle {
  background-image: radial-gradient(
    closest-side,
    var(--inner-circle-color),
    var(--primary-bg-color)
  );
  position: absolute;
  filter: blur(50px);
}

.left-circle {
  height: 1000px;
  width: 1000px;
  top: 0px;
  left: -20%;
  opacity: 0.2;
}

.right-circle {
  height: 800px;
  width: 800px;
  top: -200px;
  left: 60%;
  opacity: 0.1;
}
</style>
