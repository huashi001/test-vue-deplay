import Vue from 'vue'
import App from './App.vue'

// import { default as vue2 } from 'vue'

Vue.config.productionTip = false
Vue.component('my-a', {
  props: ['url'],
  render: (h, ctx) => {
    console.log(ctx)
    return h('a', 'url')
  }
})

Vue.filter('capper', (val) => {
  return val.toUpperCase()
})

window.Vue = Vue

console.log(Vue.options)

new Vue({
  // template: '<a>aaa</a>',
  render: h => h(App),
  el: '#app',
})


function Test() {

}
Test.options = Object.create(null)
Test.options.filters = Object.create(null)
Test.options.filters.capper = () => {
  console.log(11)
}
window.Test = Test

// console.log(Vue.options, Test.options)