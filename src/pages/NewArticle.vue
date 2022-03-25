<template>
  <div class='a'>
    <mavon-editor v-model="value" :subfield='false' @imgAdd='imgAdd' ref='md'/>
    <button @click='save'>保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  created() {
    const id = Number(this.$route.params.id);
    if (id !== -1) {
      const items = JSON.parse(localStorage.getItem('items') || '[]');
      const index = items.findIndex(a => a.id === id);
      this.value = items[index].content;
    }
  },
  methods: {
    save() {
      const id = Number(this.$route.params.id);
      const items = JSON.parse(localStorage.getItem('items') || '[]');
      if (id === -1) {
        items.push({
          id: Math.random(),
          title: 'test',
          content: this.value,
        });
      } else {
        const index = items.findIndex(a => a.id === id);
        items[index].content = this.value;
      }
     
      localStorage.setItem('items', JSON.stringify(items));
      this.$router.push('/')
    },
    imgAdd(name, file) {
      console.log(name, file)
      this.$refs.md.$img2Url(name, 'https://www.baidu.com/img/flexible/logo/pc/result.png')
    }
  }
}
</script>
<style scoped>
.a {
  color: red;
}
</style>