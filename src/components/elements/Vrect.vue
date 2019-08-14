<template>
<g>
  <rect
    @mousedown="mouseDownHandler"
    @mouseup="mouseupHandler"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"
  />
  </g>
</template>

<script>
export default {
  props: {
    mousePos: {
      type: Object
    }
  },
  data() {
    return {
      draggable:false,
      width: 100,
      height: 200,
      x: 0,
      y: 0
    };
  },
  methods: {
    mouseDownHandler(e) {
      this.draggable = true;
      this.initMsX = e.offsetX;
      this.initMsY = e.offsetY;
      this.initPosX = this.x;
      this.initPosY = this.y;
    },
    mouseupHandler() {
       this.draggable = false;
    },
    drag(newPos){
      if(this.draggable){
         this.x = this.initPosX + (newPos.x - this.initMsX);
         this.y = this.initPosY + (newPos.y - this.initMsY);
      }
    },
    stopDrag(){
      this.draggable = false
    }
  },
  watch:{
    mousePos:{
      handler(newPos){
         this.drag(newPos)
      },
      deep:true
    }
  },
  create(){
    this._bus.$on('app_mouse_up', this.stopDrag)
  }
};
</script>

<style lang="scss" scoped>
</style>