<template>
  <g @mousedown.stop>
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
  computed: {
    // 根据选择的元素，计算出hint的元素位置
    hintElments() {
      //hint的样式
      let defaultStyle = {
        name: "Vrect",
        type: 'hint',
        rx: 5,
        ry: 5,
        width: 10,
        height: 10,
        fill: "#0072fb",
        stroke: "#fff",
        'stroke-width':'2',
        transform: '',
      };
      let elarr = [];
      if (this.option.type == "rect") {
        //计算出rect类型的hint
        let {x ,y, width:rw,height:rh,'stroke-width':rsw} = this.option;
        const {width:w,height:h} = defaultStyle;
        if(!rsw) rsw = 0;
        const l = x - (w/2) - (rsw/2),c = x + (rw)/2 - (w/2),r = x + rw - (w/2) + (rsw/2);
        const t = y - (h/2) - (rsw/2),m = y + (rh)/2 - (h/2),b = y + rh - (h/2) + (rsw/2);
        elarr.push(Object.assign({},defaultStyle,{x: l,y: t,style: 'cursor: nw-resize;'})) //左上
        elarr.push(Object.assign({},defaultStyle,{x: c,y: t,style: 'cursor: n-resize;'})) //中上
        elarr.push(Object.assign({},defaultStyle,{x: r,y: t,style: 'cursor: ne-resize;'})) //右上
        elarr.push(Object.assign({},defaultStyle,{x: l,y: m,style: 'cursor: w-resize;'})) //中左
        elarr.push(Object.assign({},defaultStyle,{x: r,y: m,style: 'cursor: e-resize;'})) //中右
        elarr.push(Object.assign({},defaultStyle,{x: l,y: b,style: 'cursor: sw-resize;'})) //下左
        elarr.push(Object.assign({},defaultStyle,{x: c,y: b,style: 'cursor: s-resize;'})) //下中
        elarr.push(Object.assign({},defaultStyle,{x: r,y: b,style: 'cursor: se-resize;'})) //下右
      }
      return elarr;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>