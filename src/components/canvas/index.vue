<template>
  <div class="canvas">
    <svg @mousemove="mouseMoveHandler" @mousedown="mouseDownHandler" @contextmenu.prevent="contextHandler" ref="svg" >
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
      selectedIndex: -1,
      elements: [
        {
          name: "Vrect",
          type: 'rect',
          width: 200,
          height: 200,
          x: 33,
          y: 200,
          rx: 22,
          ry: 22,
          fill: "red",
          stroke: "yellow",
          "stroke-width": "100",
          transform: "",
          style: "cursor:move"
        },{
          name: "Vrect",
          type: 'rect',
          width: 100,
          height: 200,
          x: 33,
          y: 22,
          rx: 0,
          ry: 0
        }
      ]
    };
  },
  components: {Hint},
  methods: {
    mouseMoveHandler(e) {
      this.mousePosX = e.offsetX;
      this.mousePosY = e.offsetY;

      if (this.dragIndex > -1) {
        this.drag();
      }
    },
    mouseDownHandler(down_e) {
      console.log('mosedown')
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
    },
    undrag() {
      this.dragIndex = -1;
    },
    changeIndex(index) {
      this.selectedIndex = index;
    }
  },
  created() {
    this._bus.$on("changeIndex", this.changeIndex);
    this._bus.$on("doc_mouse_up", this.undrag);
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  height: 794px;
  width: 1123px;
  border: 1px solid #ccc;
  svg {
    height: 100%;
    width: 100%;
  }
}
</style>