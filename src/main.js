import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 动态设置 REM 基准值（html标签字体大小）
import 'amfe-flexible'

// 注册 Vant 组件
import './utils/register-vant'

// 加载全局样式
// 注意：该样式文件要放到第三方样式之后
import './styles/index.less'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
