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
      @mousedown="mouseDownHandler"
    />
    <g>
      <foreignObject
        :x="option.x"
        :y="option.y"
        :width="option.width"
        :height="option.height"
        @mousedown="mouseDownHandler"
        :style="`cursor:move;overflow:visible;`"
        pointer-events="all"
      >
        <div
          :style="`width:100%;height:100%;box-sizing:border-box;;padding:5px;display:flex;justify-content: center;align-items: center;`"
        >
          <p
            :contenteditable="isEditing"
            :style="option.style+`;outline:none;cursor:text;-webkit-user-modify:read-write-plaintext-only;`"
            @blur="updateHtml"
            @mousedown="textMouseDown"
            v-html="option.html"
          ></p>
        </div>
      </foreignObject>
    </g>
  </g>
</template>

<script>
export default {
  name: "Vtext",
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
      isEditing: true
    };
  },
  methods: {
    mouseDownHandler(e) {
      this._bus.$emit("changeIndex", this.index);
    },
    updateHtml(e) {
      this._bus.$emit("updateHtml", e.target.innerHTML, this.index);
    },
    focusHandler(e) {
      this._bus.$emit("changeIndex", this.index);
    },
    textMouseDown() {
      this.isEditing = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>