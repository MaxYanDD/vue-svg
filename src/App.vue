<template>
  <div id="app" @mouseup="mouseupHandler">
    <Canvas />
  </div>
</template>

<script>
import Canvas from "./components/canvas";
export default {
  name: "app",
  components: {
    Canvas
  },
  methods: {
    mouseUpHandler() {
      this._bus.$emit("app_mouse_up");
    }
  }
};
</script>

<style>
</style>
