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
      :stroke-width="option.strokeWidth"
      :transform="option.transform"
      :stroke-dasharray="option.dasharray"
      :style="option.style"
    />
    <g>
      <foreignObject
        :x="option.x"
        :y="option.y"
        :width="option.width"
        :height="option.height"
        :style="`cursor:move;overflow:visible;`"
        pointer-events="all"
      >
        <div
          style="width:100%;height:100%;padding:5px;box-sizing:border-box;display:flex;justify-content:center;align-items:center;"
        >
          <p
            :contenteditable="isEditing"
            :style="option.style+`;outline:none;cursor:text;`"
            @mousedown="doEditing"
            @blur="updateHtml"
            v-html="option.html"
          ></p>
        </div>
      </foreignObject>
    </g>
  </g>
</template>

<script>
import state from '@/store';
export default {
  name: 'Vhtml',
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
      isEditing: false
    };
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
    doEditing() {
      this.isEditing = true;
    },
    updateHtml(e) {
      if (e.target.innerHTML) {
        state.elements[this.index].html = e.target.innerHTML;
      } else {
        state.elements.splice(this.index, 1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>