<template>
  <g @mousedown="mouseDownHandler">
    <image
      :x="option.x"
      :y="option.y"
      :width="option.width"
      :height="option.height"
      :xlink:href="option.src"
      preserveAspectRatio="none"
      :style="option.style"
    />

    <rect
      :x="option.x"
      :y="option.y"
      :width="option.width"
      :height="option.height"
      :rx="option.rx"
      :ry="option.ry"
      :fill="option.fill"
      :stroke="option.stroke"
      :stroke-width="option.strokeWidth"
      :transform="option.transform"
      :stroke-dasharray="option.dasharray"
      :style="option.style"
    />
  </g>
</template>

<script>
import state from '@/store';
export default {
  name: 'Vimage',
  props: {
    option: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    mouseDownHandler(e) {
      if (e.ctrlKey) {
        state.selectedIndex.push(this.index);
      } else {
        if (!state.selectedIndex.includes(this.index)) {
          state.selectedIndex = [this.index];
        }
      }
    },
    resizeImage(e) {
      let img = new Image();
      img.onload = () => {
        state.elements[this.index].width = img.width;
        state.elements[this.index].height = img.height;
        state.elements[this.index].ratio = img.height / img.width;
        img = null;
      };
      img.src = this.option.src;
    }
  },
  created() {
    this.resizeImage();
  }
};
</script>

<style lang="scss" scoped>
</style>