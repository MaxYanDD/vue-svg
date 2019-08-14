<template>
  <div class="canvas" >
    <svg @mousemove="mouseMoveHandler">
      <Vrect :mousePos="mousePos"/>
    </svg>
    <button>点我</button>
  </div>
</template>

<script>
import Vrect from "../elements/Vrect";
export default {
  data() {
    return {
       mousePos:{
           x:0,
           y:0,
       } 
    };
  },
  components: {
    Vrect
  },
  methods: {
    mouseMoveHandler(e) {
      this.mousePos.x = e.offsetX;
      this.mousePos.y = e.offsetY;
    },
 
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  margin: 20px;
  height: 500px;
  width: 500px;
  svg {
    height: 100%;
    width: 100%;
  }
}
</style>