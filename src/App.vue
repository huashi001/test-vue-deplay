<template>
  <div id="app">
    <mavon-editor v-model="value" :subfield='false' :editable='editable' :toolbars-flag="false" default-open='preview'/>
    <button @click='add'>保存</button>
    <div>
      <div v-for='item in list' :key='item.id' @click='choose(item)'>{{item.title}}</div>
    </div>
  </div> 
</template>

<script>

export default {
  name: 'App',
  props: ['a'],
  data(){
    return {
      editable: true,
      value: `# 组件的拓展

## 异步组件

## 指令的实现

## 混入

## 实现 keepAlive

## memoize 的意义和实现

## hooks 的意义和实现

## 错误处理`,
      list: []
    }
  },
  methods: {
    add() {
      this.list.push({
        id: this.list.length,
        title: '文章' + this.list.length,
        content: this.value
      })
    },
    choose(item) {
      this.value = item.content;
      this.editable = false;
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
