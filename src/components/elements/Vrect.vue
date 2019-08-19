<template>
  <g>
    <rect
      :x="option.x"
      :y="option.y"
      :width="option.width"
      :height="option.height"
      :rx="option.rx"
      :ry="option.ry"
      :fill="option.fill"
      :stroke="option.stroke"
      :stroke-width="option.strokeWidth || 0"
      :transform="option.transform"
      :stroke-dasharray="option.dasharray "
      :style ="option.style"
      @mousedown="mouseDownHandler" 
    />
  </g>
</template>

<script>
export default {
  name:'Vrect',
  props: {
    option: {
      type: Object
    },
    index:{
      type: Number
    },
  },
  data() {
    return {
      draggable: false,
      width: 100,
      height: 200,
      x: 33,
      y: 33
    };
  },
  methods:{
    mouseDownHandler(){
      if(this.option.type == 'hint') {
        this._bus.$emit('resize',this.option.dr)
        return
      };
      this._bus.$emit('changeIndex',this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>