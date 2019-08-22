import Vue from 'vue';

const state = Vue.observable({
  svgH: 500,
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
      html: '哈哈哈'
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
      src:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg',
      ratio:true
    }
  ]
});

export default state;