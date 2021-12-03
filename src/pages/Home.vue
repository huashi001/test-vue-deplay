<template>
  <div>
    <a @click='add()'>新建</a>
    <div v-for='item in items' :key='item.id' @click='choose(item)' class='row'>
      <div>{{item.title}}</div>
      <a @click='add(item.id)'>编辑</a>
      <a @click='preview(item.id)'>预览</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.items = JSON.parse(localStorage.getItem('items'));
  },
  methods: {
    preview(id) {
      this.$router.push(`/preview/${id}`)
    },
    add(id) {
      this.$router.push(`/new/${id || '-1'}`);
    }
  }
}
</script>
<style scoped>
.row{
  display: flex;
}
.row a{
  margin-left: 8px;
}
</style>