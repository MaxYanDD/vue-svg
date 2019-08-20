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
        @mousedown="mouseDownHandler(false)"
        :style="`cursor:move;overflow:visible;`"
        pointer-events="all"
      >
        <div style="width:100%;height:100%">
          <p
            :contenteditable="isEditing"
            :style="option.style+`;outline:none;cursor:text;`"
            @mousedown.stop
          >{{option.text}}</p>
        </div>
      </foreignObject>
    </g>
  </g>
</template>

<script>
export default {
  name: 'Vtext',
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
    mouseDownHandler(value) {
      if(value) {
        return;
      }else{
        this._bus.$emit('changeIndex', this.index);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>