// 样式

export default {
  // 改变大小可拖拽rect hint的默认样式
  rectHintEl: {
    name: 'Vrect',
    type: 'hint',
    rx: 5,
    ry: 5,
    width: 10,
    height: 10,
    fill: '#0072fb',
    stroke: '#fff',
    strokeWidth: '2',
    transform: ''
  },
  rectHintStroke: {
    name: 'Vrect',
    type: 'hint',
    rx: 0,
    ry: 0,
    fill: 'none',
    stroke: '#0072fb',
    strokeWidth: 1,
    dasharray: '5,5',
    transform: '',
    style: 'pointer-events: none'
  }
};
