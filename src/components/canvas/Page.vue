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
      :style="option.style"
    />
  </g>
</template>

<script>
import config from './config'
export default {
  name: 'Page',

};
</script>

<style lang="scss" scoped>
</style>