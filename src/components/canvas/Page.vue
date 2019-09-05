<template>
  <g pointer-events="none">
    <rect
      :x="option.x"
      :y="option.y"
      :width="option.width"
      :height="option.height"
      fill="#fff"
    />
  </g>
</template>

<script>
import config from './config'
import state from '@/store';

export default {
  props:['canvasSize'],
  name: 'Page',
  data() {
    return {
      pageConfig: config.pageSize
    }
  },
  computed: {
    option(){
      const {width,height} = this.pageConfig;
      const {width:cvw,height:cvh} = this.canvasSize;
      return {
        x: Math.floor((cvw-width)/2),
        y:  Math.floor((cvh-height)/2),
        width,
        height,
      };
    }
  },
};
</script>

<style lang="scss" scoped>
</style>