<template>
  <g @mousedown="mouseDownHandler">
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
import state from '@/store';
export default {
  name: 'Vrect',
  props: {
    option: {
      type: Object
    },
    index: {
      type: Number
    }
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
  methods: {
    mouseDownHandler(e) {
      if (this.option.type == 'hint') {
        state.resizeDr = this.option.dr;
        return;
      }
      if (e.ctrlKey) {
        state.selectedIndex.push(this.index);
      } else {
        if (!state.selectedIndex.includes(this.index)) {
          state.selectedIndex = [this.index];
        }
      }
    }
  },
  computed: {
    selectedIndex() {
      return state.selectedIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>