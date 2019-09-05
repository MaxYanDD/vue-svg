<template>
  <div class="canvas">
    <svg
      @mousemove="mouseMoveHandler"
      @mousedown="mouseDownHandler"
      @contextmenu.prevent="contextHandler"
      viewBox="0 0 3000 3000"
      ref="svg"
    >
      <!-- 背景 -->
      <Page v-if="canvasSize" :canvasSize="canvasSize"/>
      <!-- 元素 -->
      <g>
        <template v-for="(ele,index) in elements">
          <component :is="ele.name" :option="ele" :index="index" :key="index" />
        </template>
      </g>
      <!-- 辅助 -->
      <g>
        <template v-if="selectedIndex.length > 0">
          <Hint v-for="id in selectedIndex" :option="elements[id]" :key="id" :id="id" />
        </template>
      </g>
    </svg>
  </div>
</template>

<script>
import state from '@/store';
import Hint from './Hint';
import Page from './Page';
import _reize from '../../utils/resize';
export default {
  data() {
    return {canvasSize:null};
  },
  components: { Hint, Page },
  methods: {
    mouseMoveHandler(e) {
      this.mousePosX = e.clientX;
      this.mousePosY = e.clientY;

      if (this.resizeDr) {
        state.showHitElmets = false;
        this.resize(this.resizeDr);
        return;
      }

      if (this.dragIndex.length > 0) {
        state.showHitElmets = false;
        this.drag();
        return;
      }
    },
    mouseDownHandler(down_e) {
      // 记录mousedown的初始位置
      if (down_e.target == this.$refs['svg']) {
        state.selectedIndex = [];
        return;
      }

      if (down_e.target.isContentEditable) {
        //如果是可编辑
        return;
      }

      this.initmsX = this.mousePosX;
      this.initmsY = this.mousePosY;

      if (state.resizeID > -1) {
        //记录reize元素初始尺寸
        const { x, y, width, height } = state.elements[state.resizeID];
        this.rsinitX = x;
        this.rsinitY = y;
        this.rsinitW = width;
        this.rsinitH = height;
        return;
      }

      this.dragIndex = state.selectedIndex;
      this.dragInitPosArr = [];
      this.dragIndex.forEach((id, index) => {
        const { x, y } = state.elements[id];
        this.dragInitPosArr.push({ x, y });
      });
    },
    contextHandler() {},
    drag() {
      this.dragIndex.forEach((id, index) => {
        //todo
        let x = this.dragInitPosArr[index].x + this.mousePosX - this.initmsX;
        let y = this.dragInitPosArr[index].y + this.mousePosY - this.initmsY;
        this.$set(state.elements, id, Object.assign({}, state.elements[id], { x, y }));
      });
    },
    doc_mouse_up() {
      this.dragIndex = -1;
      state.resizeDr = '';
      state.resizeID = -1;
      state.showHitElmets = true;
    },
    setSvgHeight() {
      let max = 0;
      state.elements.forEach(op => {
        if (op.y + op.height + op.strokeWidth / 2 > max) {
          max = op.y + op.height + op.strokeWidth / 2;
        }
      });
      state.svgH = max;
    },
    updateSvgHeight() {
      const { y, height, strokeWidth: strokeW } = state.elements[state.resizeID];
      state.svgH = y + height + strokeW / 2 > state.svgH ? y + height + strokeW / 2 : state.svgH;
    },
    add() {
      // 更新svg的高度
      this.updateSvgHeight();
    },
    resize(dr) {
      const option = state.elements[state.resizeID];
      let { x, y, width, height } = _reize[dr]({
        imsX: this.initmsX,
        imsY: this.initmsY,
        nmsX: this.mousePosX,
        nmsY: this.mousePosY,
        x: this.rsinitX,
        y: this.rsinitY,
        width: this.rsinitW,
        height: this.rsinitH,
        ratio: option.keepratio ? option.ratio : false
      });
      option.x = x;
      option.y = y;
      option.width = width;
      option.height = height;
    },
    getCanvsSize() {
      if(!this.$refs['svg']) return;
      this.canvasSize = this.$refs['svg'].getBoundingClientRect();
    },

  },
  created() {
    this.dragIndex = [];
    this._bus.$on('doc_mouse_up', this.doc_mouse_up);
  },
  computed: {
    elements() {
      return state.elements;
    },
    selectedIndex() {
      return state.selectedIndex;
    },
    resizeDr() {
      return state.resizeDr;
    },
    svgH() {
      return state.svgH;
    }
  },
  mounted() {
    this.getCanvsSize();
    window.addEventListener('resize',this.getCanvsSize)
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  flex: 1;
  overflow: hidden;
  background-color: #f1f1f1;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>