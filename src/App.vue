<template>
  <div id="app">
    <ToolBar />
    <Canvas />
  </div>
</template>

<script>
import ToolBar from './components/toolsbar'
import Canvas from "./components/canvas";
export default {
  name: "app",
  data() {
    return {
    
    }
  },
  components: {
    Canvas,
    ToolBar
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/_global.scss';

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
