<template>
  <div class="hello">
    <h1 @click='test'>{{ msg | capper}}</h1>
    <slot>1</slot>
    <slot name='test1'></slot>
    <slot name='test2' :b='{x}'></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // el: '#app',
  props: {
    msg: String
  },
  data() {
    return {
      hello: 1,
      x: Math.random()
    }
  },
  renderError(h){
    return h('p', 'this is a para')
  },
  render(h){
    return h('p', 'this is a para from render')
  },
  // render(){
  //   return <a>{this.msg}</a>
  // },
  mounted() {
    console.log(this.$slots, 'slot')
    console.log(this.$scopedSlots, 'scopedSlots')
  },
  methods: {
    test() {
      this.$emit('click', 1, 2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
