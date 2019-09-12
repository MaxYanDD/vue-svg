<template>
  <g pointer-events="none" style="">
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
  name: 'Page',
  data() {
    return {
    }
  },
  computed: {
    option(){
      return state.pageSize;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>