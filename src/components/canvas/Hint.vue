<template>
  <g @mousedown="mouseDownHandler">
    <Vrect :option="hintStroke" />
    <template v-if="showHitElmets">
      <template v-for="(ele,index) in hintElments">
        <component :is="ele.name" :key="index" :option="ele"></component>
      </template>
    </template>
  </g>
</template>

<script>
import config from './config';
import state from '@/store';
export default {
  props: {
    option: {
      //被选中的图像的option
      type: Object
    },
    id: {
      //当前选中元素的index
      type: Number
    }
  },
  created() {},
  computed: {
    // 根据选择的元素，计算出hint的元素位置
    hintElments() {
      //hint的样式
      let defaultStyle = config.rectHintEl;
      let elarr = [];
      if (this.option.type == 'rect') {
        //计算出rect类型的hint
        let { x, y, width: rw, height: rh, strokeWidth: rsw } = this.option;
        let { width: w, height: h } = defaultStyle;
        
        if (!rsw) rsw = 0;
        const l = x - w / 2 - rsw / 2,
          c = x + rw / 2 - w / 2,
          r = x + rw - w / 2 + rsw / 2;
        const t = y - h / 2 - rsw / 2,
          m = y + rh / 2 - h / 2,
          b = y + rh - h / 2 + rsw / 2;

        defaultStyle.width = w/this.pageScale;
        defaultStyle.height = h/this.pageScale;
        defaultStyle.strokeWidth = defaultStyle.strokeWidth/this.pageScale;
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: l,
            y: t,
            dr: 'lt',
            style: `cursor: nw-resize; `
          })
        ); //左上
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: c,
            y: t,
            dr: 'ct',
            style: 'cursor: n-resize;'
          })
        ); //中上
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: r,
            y: t,
            dr: 'rt',
            style: 'cursor: ne-resize;'
          })
        ); //右上
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: l,
            y: m,
            dr: 'lm',
            style: 'cursor: w-resize;'
          })
        ); //中左
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: r,
            y: m,
            dr: 'rm',
            style: 'cursor: e-resize;'
          })
        ); //中右
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: l,
            y: b,
            dr: 'lb',
            style: 'cursor: sw-resize;'
          })
        ); //下左
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: c,
            y: b,
            dr: 'cb',
            style: 'cursor: s-resize;'
          })
        ); //下中
        elarr.push(
          Object.assign({}, defaultStyle, {
            x: r,
            y: b,
            dr: 'rb',
            style: 'cursor: se-resize;'
          })
        ); //下右
      }
      return elarr;
    },
    hintStroke() {
      let defaultStyle = config.rectHintStroke;
      let { x, y, width, height, strokeWidth } = this.option;
      strokeWidth = strokeWidth ? strokeWidth : 0;
      x -= strokeWidth / 2;
      y -= strokeWidth / 2;
      width += strokeWidth;
      height += strokeWidth;
      return Object.assign({}, defaultStyle, { x, y, width, height });
    },
    showHitElmets(){
      return state.showHitElmets
    },
    pageScale(){
      return state.pageScale
    }
  },
  methods: {
    mouseDownHandler(e) {
      state.resizeID = [this.id];
      state.selectedIndex = [this.id];
    }
  }
};
</script>

<style lang="scss" scoped>
</style>