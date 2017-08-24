import Vue from 'vue'
import Router from 'vue-router'
import singer from '../components/singer/singer.vue'
import home from '../components/home/home.vue'
import blogs from '../components/blogs/blogs.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/musicBox',
      component: singer
    },
    {
      path: '/blogs',
      component: blogs
    }
  ]
})
