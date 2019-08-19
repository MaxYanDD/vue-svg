<template>
  <g>
    <Vrect :option="hintStroke" />
    <template v-for="(ele,index) in hintElments">
      <component :is="ele.name" :key="index" :option="ele"></component>
    </template>
  </g>
</template>

<script>
export default {
  props: {
    option: {
      //被选中的图像的option
      type: Object
    }
  },
  created() {},
  computed: {
    // 根据选择的元素，计算出hint的元素位置
    hintElments() {
      //hint的样式
      let defaultStyle = {
        name: "Vrect",
        type: "hint",
        rx: 5,
        ry: 5,
        width: 10,
        height: 10,
        fill: "#0072fb",
        stroke: "#fff",
        strokeWidth: "2",
        transform: ""
      };
      let elarr = [];
      if (this.option.type == "rect") {
        //计算出rect类型的hint
        let { x, y, width: rw, height: rh, strokeWidth: rsw } = this.option;
        const { width: w, height: h } = defaultStyle;
        if (!rsw) rsw = 0;
        const l = x - w / 2 - rsw / 2,
          c = x + rw / 2 - w / 2,
          r = x + rw - w / 2 + rsw / 2;
        const t = y - h / 2 - rsw / 2,
          m = y + rh / 2 - h / 2,
          b = y + rh - h / 2 + rsw / 2;
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: l,
            y: t,
            dr: "lt",
            style: "cursor: nw-resize;"
          })
        ); //左上
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: c,
            y: t,
            dr: "ct",
            style: "cursor: n-resize;"
          })
        ); //中上
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: r,
            y: t,
            dr: "rt",
            style: "cursor: ne-resize;"
          })
        ); //右上
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: l,
            y: m,
            dr: "lm",
            style: "cursor: w-resize;"
          })
        ); //中左
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: r,
            y: m,
            dr: "rm",
            style: "cursor: e-resize;"
          })
        ); //中右
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: l,
            y: b,
            dr: "lb",
            style: "cursor: sw-resize;"
          })
        ); //下左
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: c,
            y: b,
            dr: "cb",
            style: "cursor: s-resize;"
          })
        ); //下中
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: r,
            y: b,
            dr: "rb",
            style: "cursor: se-resize;"
          })
        ); //下右
      }
      return elarr;
    },
    hintStroke() {
      let defaultStyle = {
        name: "Vrect",
        type: "hint",
        rx: 0,
        ry: 0,
        fill: "none",
        stroke: "#0072fb",
        strokeWidth: 1,
        dasharray: "5,5",
        transform: "",
        style: "pointer-events: none"
      };

      let { x, y, width, height, strokeWidth } = this.option;
      strokeWidth = strokeWidth ? strokeWidth : 0;
      x -= strokeWidth / 2;
      y -= strokeWidth / 2;
      width += strokeWidth;
      height += strokeWidth;
      return Object.assign({}, defaultStyle, { x, y, width, height });
    }
  },
  methods: {
    mouseDownHandler(e) {
      this.mousePosX = e.clientX;
      this.mousePosY = e.clientY;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>