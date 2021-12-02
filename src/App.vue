<template>
  <div id="app" @click='test'>
   测试deplay
  </div>
</template>

<script>

export default {
  name: 'App',
  props: ['a'],
  data(){
    return {
      b:2 
    }
  },
  methods: {
    test() {
      alert(this.b++)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
