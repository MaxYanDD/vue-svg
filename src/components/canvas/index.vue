<template>
  <div class="canvas">
    <svg
      :height="svgH"
      @mousemove="mouseMoveHandler"
      @mousedown="mouseDownHandler"
      @contextmenu.prevent="contextHandler"
      ref="svg"
    >
      <!-- 背景 -->
      <g />
      <!-- 元素 -->
      <g>
        <template v-for="(ele,index) in elements">
          <component :is="ele.name" :option="ele" :index="index" :key="index" />
        </template>
      </g>
      <!-- 辅助 -->
      <template v-if="selectedIndex > -1">
        <Hint :option.sync="elements[selectedIndex]" />
      </template>
    </svg>
  </div>
</template>

<script>
import Hint from "./Hint";
import _reize from "../../utils/resize";
export default {
  data() {
    return {
      svgH: 0,
      selectedIndex: -1,
      resizeDr: "",
      isTextEditing: false,
      elements: [
        {
          name: "Vrect",
          type: "rect",
          width: 50,
          height: 50,
          x: 5,
          y: 5,
          rx: 5,
          ry: 5,
          fill: "red",
          stroke: "yellow",
          strokeWidth: 10,
          transform: "",
          style: "cursor:move"
        },
        {
          name: "Vrect",
          type: "rect",
          width: 100,
          height: 200,
          x: 100,
          y: 100,
          rx: 0,
          ry: 0,
          fill: "#ccc",
          stroke: "yellow",
          strokeWidth: 0,
          transform: "",
          style: "cursor:move"
        },{
          name: "Vtext",
          type: "rect",
          x: 300,
          y: 300,
          width: 200,
          height: 50,
          rx: 0,
          ry: 0,
          fill: '#ccc',
          stroke: "",
          strokeWidth: 0,
          transform: "",
          style: "",
          html:'单击此处添加文本'
        }
      ]
    };
  },
  components: { Hint },
  methods: {
    mouseMoveHandler(e) {
      this.mousePosX = e.clientX;
      this.mousePosY = e.clientY;

      if (this.resizeDr) {
        this.resize(this.resizeDr);
        this.updateSvgHeight()
        return;
      }

      if (this.dragIndex > -1) {
        this.drag();
        return;
      }
    },
    mouseDownHandler(down_e) {
      // 记录mousedown的初始位置
      if (down_e.target == this.$refs["svg"]) {
        this.selectedIndex = -1;
        return;
      }
      
      this.dragIndex = this.selectedIndex;
      const { x, y,width,height } = this.elements[this.dragIndex];
      this.initX = x;
      this.initY = y;
      this.initW = width;
      this.initH = height;
      this.initmsX = this.mousePosX;
      this.initmsY = this.mousePosY;
    },
    contextHandler() {},
    drag() {
      let x = this.initX + this.mousePosX - this.initmsX;
      let y = this.initY + this.mousePosY - this.initmsY;
      this.$set(
        this.elements,
        this.dragIndex,
        Object.assign({}, this.elements[this.dragIndex], { x, y })
      );
      this.updateSvgHeight();
    },
    doc_mouse_up() {
      this.dragIndex = -1;
      this.resizeDr = "";
    },
    changeIndex(index) {
      this.selectedIndex = index;
    },
    setSvgHeight() {
      let max = 0;
      this.elements.forEach(op => {
        if (op.y + op.height + op.strokeWidth / 2 > max) {
          max = op.y + op.height + op.strokeWidth / 2;
        }
      });
      this.svgH = max;
    },
    updateSvgHeight() {
      const { y, height, strokeWidth: strokeW } = this.elements[
        this.dragIndex
      ];
      this.svgH =
        y + height + strokeW / 2 > this.svgH
          ? y + height + strokeW / 2
          : this.svgH;
    },
    add() {
      // 更新svg的高度
      this.updateSvgHeight();
    },
    resize(dr) {
      const { width, height } = this.elements[this.dragIndex];
      let newOption = _reize[dr]({
        imsX: this.initmsX,
        imsY: this.initmsY,
        nmsX: this.mousePosX,
        nmsY: this.mousePosY,
        x: this.initX,
        y: this.initY,
        width:this.initW,
        height:this.initH
      });
      this.$set(
        this.elements,
        this.dragIndex,
        Object.assign({ ...this.elements[this.dragIndex] }, newOption)
      );
    },
    updateHtml(html,index){
      if(!html){
        this.deleteEl(index)
        return;
      }
      this.elements[index].html = html 
    },
    deleteEl(index){
      this.elements.splice(index,1);
    }
  },
  created() {
    this.setSvgHeight();
    this._bus.$on("changeIndex", this.changeIndex);
    this._bus.$on("doc_mouse_up", this.doc_mouse_up);
    this._bus.$on("updateHtml", this.updateHtml);
    this._bus.$on("resize", dr => (this.resizeDr = dr));
  },
  computed: {}
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