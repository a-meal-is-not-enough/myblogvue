import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Blogs from "@/views/Blogs";
import BlogEdit from "@/views/BlogEdit";
import BlogDetail from "@/views/BlogDetail";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect:{name:'Blogs'}
},
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/blogs',
    name:'Blogs',
    // 懒加载
    component: () => import('../views/Blogs.vue')
  },
    {
      path: '/blog/add',
      name:'BlogAdd',
      meta: {
        requireAuth: true
      },
      component: BlogEdit
  },
  {
    path:'/blog/:blogId',
    name:'BlogDetail',
    component: BlogDetail
  },
  {
    path:'/blog/:blogId/edit',
    name:'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
