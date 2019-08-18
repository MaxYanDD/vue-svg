<template>
  <div class="canvas">
    <svg :height="svgH" @mousemove="mouseMoveHandler" @mousedown="mouseDownHandler" @contextmenu.prevent="contextHandler" ref="svg" >
      <!-- 背景 -->
      <g>

      </g>
      <!-- 元素 -->
      <g>
        <template v-for="(ele,index) in elements">
          <component
            :is="ele.name"
            :option="ele"
            :index="index"
            :key="index"
          />
        </template>
      </g>
      <!-- 辅助 -->
      <template v-if="selectedIndex > -1">
        <Hint :option="elements[selectedIndex]"/>
      </template>
    </svg>
  </div>
</template>

<script>
import Hint from './Hint'
export default {
  data() {
    return {
      svgH: 0,
      selectedIndex: -1,
      elements: [
        {
          name: "Vrect",
          type: 'rect',
          width: 50,
          height: 50,
          x: 0,
          y: 0,
          rx: 5,
          ry: 5,
          fill: "red",
          stroke: "yellow",
          "stroke-width": 0,
          transform: "",
          style: "cursor:move"
        },{
          name: "Vrect",
          type: 'rect',
          width: 100,
          height: 200,
          x: 100,
          y: 100,
          rx: 0,
          ry: 0,
          stroke: "yellow",
          "stroke-width": 0,
          transform: "",
          style: "cursor:move"
        },{
          name: "Vobject",
          type: 'object',
          width: 0,
          height: 0,
          x: 100,
          y: 100,
        }
      ]
    };
  },
  components: {Hint},
  methods: {
    mouseMoveHandler(e) {
      this.mousePosX = e.clientX;
      this.mousePosY = e.clientY;
      if (this.dragIndex > -1) {
        this.drag();
      }
    },
    mouseDownHandler(down_e) {
      // 记录mousedown的初始位置
      if (down_e.target == this.$refs["svg"]) {
        this.selectedIndex = -1;
        return
      };
      this.dragIndex = this.selectedIndex;
      const { x, y } = this.elements[this.dragIndex];
      this.initX = x;
      this.initY = y;
      this.initmsX = this.mousePosX;
      this.initmsY = this.mousePosY;
    },
    contextHandler(){

    },
    drag() {
      let x = this.initX + this.mousePosX - this.initmsX;
      let y = this.initY + this.mousePosY - this.initmsY;
      this.$set(
        this.elements,
        this.dragIndex,
        Object.assign(this.elements[this.dragIndex], { x, y })
      );
      this.updateSvgHeight();
    },
    undrag() {
      this.dragIndex = -1;
    },
    changeIndex(index) {
      this.selectedIndex = index;
    },
    setSvgHeight() {
      let max = 0;
      this.elements.forEach(op => {
        if(op.y+op.height+op['stroke-width']/2 > max){
          max = op.y + op.height + op['stroke-width']/2
        }
      });
      this.svgH = max;
    },
    updateSvgHeight(){
      console.log('updat');
      
      const {y,height,'stroke-width':strokeW } = this.elements[this.dragIndex];
      this.svgH = (y+height+strokeW/2) > this.svgH ? (y+height+strokeW/2) : this.svgH;
    },
    add(){

      // 更新svg的高度
      this.updateSvgHeight();
    }
  },
  created() {
    this.setSvgHeight();
    this._bus.$on("changeIndex", this.changeIndex);
    this._bus.$on("doc_mouse_up", this.undrag);
  },
  computed:{

  }
};
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  border: 1px solid #ccc;
  svg {
    width: 100%;
  }
}
</style>