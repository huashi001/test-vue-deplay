import VueRouter from 'vue-router'
import Home from './pages/Home.vue'
import NewArticle from './pages/NewArticle.vue'
import Preview from './pages/Preview.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new/:id',
    name: 'NewArticle',
    component: NewArticle
  },
  {
    path: '/preview/:id',
    name: 'preview',
    component: Preview
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

// const router = createRouter({
//   routes
// })

export default new VueRouter({
  routes,
})