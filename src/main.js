import Vue from "vue";
import App from "./App.vue";
import bindDocEvent from  './utils/doc'
// 将elements中的组件注册为全局
const componentsContext = require.context(
  "./components/elements",
  true,
  /\.vue$/
);

componentsContext.keys().forEach(component => {
  // 获取文件中的 default 模块
  const componentConfig = componentsContext(component).default;
  Vue.component(componentConfig.name, componentConfig);
});


Vue.config.productionTip = false;
const bus = new Vue();
Vue.prototype._bus = bus;
bindDocEvent(bus);
new Vue({
  render: h => h(App)
}).$mount("#app");
