<template>
  <div>
    <Button
      type="primary"
      v-for="(item, index) in comp1_vfor"
      :key="index"
      @click="onButton1Click"
    >
      按钮
    </Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comp1_vfor: ["11","22","33"],

    }
  },
  methods: {
    onButton1Click() {
      // alert(item)
    },

  }
}
</script>