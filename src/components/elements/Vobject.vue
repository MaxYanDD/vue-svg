<template>
  <g :transform="`translate(${option.x},${option.y})`">
    <foreignObject @mousedown="mouseDownHandler" style="overflow:visible;" pointer-events="all">
      <el-time-select
        v-model="value"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        placeholder="选择时间"
      ></el-time-select>
    </foreignObject>
  </g>
</template>

<script>
// foreignObject兼容性差
export default {
  name: "Vobject",
  props: {
    option: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data(){
    return {
      value: ''
    }
  },
  methods: {
    mouseDownHandler() {
      this._bus.$emit("changeIndex", this.index);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>