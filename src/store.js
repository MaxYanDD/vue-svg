import Vue from 'vue';

const state = Vue.observable({
  pageSize: null,
  pageScale:1,
  showHitElmets: true,
  selectedIndex: [],
  resizeDr: '',
  resizeID: -1,
  elements: [
    {
      name: 'Vrect',
      type: 'rect',
      width: 100,
      height: 200,
      x: 100,
      y: 100,
      rx: 0,
      ry: 0,
      fill: '#ccc',
      stroke: 'yellow',
      strokeWidth: 0,
      transform: '',
      style: 'cursor:move'
    },
    {
      name: 'Vhtml',
      type: 'rect',
      x: 200,
      y: 200,
      width: 100,
      height: 50,
      rx: 0,
      ry: 0,
      fill: '#bcbcbc',
      stroke: '',
      strokeWidth: 0,
      transform: '',
      style: '',
      html: '可编辑文本'
    },
    {
      name: 'Vimage',
      type: 'rect',
      x: 400,
      y: 400,
      width: 100,
      height: 50,
      rx: 0,
      ry: 0,
      fill: 'none',
      stroke: '',
      strokeWidth: 0,
      transform: '',
      style: 'cursor:move',
      src:'http://litku.oss-cn-beijing.aliyuncs.com/images/2019/0619/42e3b48f5cb960046e9f94a44c892cab51204c65.jpg?x-oss-process=style/w320',
      keepratio: true
    }
  ]
});

export default state;