<template>
  <div>
    <mavon-editor v-model="value" :subfield='false' :toolbars-flag="false" defaultOpen='preview'/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  created() {
    const id = this.$route.params.id;
    const items = JSON.parse(localStorage.getItem('items') || '[]');
    this.value = items.find(a => a.id === Number(id)).content;
  },
}
</script>
<style scoped>

</style>