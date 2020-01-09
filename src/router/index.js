import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    // @ 是 src 目录的别名，这是 VueCLI 项目中特殊的提供的
    component: () => import('@/views/login')

  }

  // {
  //   path: '/login',
  //   component: Login
  // }
]

const router = new VueRouter({
  routes
})

export default router
