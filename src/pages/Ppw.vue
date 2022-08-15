<template>
  <div class="ppw-root">
    比率：<input type="text" value="100" id="ratio" ref='ratio'/>
    <div class="ppw-wrapper">
      <div class="input" contenteditable="plaintext-only" ref="code"></div>
      <button @click="change">转换</button>
      <pre class="pre">{{ result }}</pre>
    </div>
  </div>
</template>

<!-- 

width: 380px;
height: 45px;
font-size: 33px;
font-family: AlibabaPuHuiTiM;
color: #FFFFFF;
line-height: 45px;

 -->
<script>
export default {
  data() {
    return {
      result: "",
    };
  },
  mounted() {
    this.$refs.code.textContent = `width: 380px;
height: 45px;
font-size: 33px;
font-family: AlibabaPuHuiTiM;
color: #FFFFFF;
line-height: 45px;
font-weight: 500;
box-shadow: 0px 1px 10px 0px rgba(74,134,247,0.15);
border-radius: 17px;
position: absolute;
top: 20px;
left: 40px;`
  },
  methods: {
    change() {
      const code = this.$refs.code.textContent;
      const ratio = Number(this.$refs.ratio.value);
      const arr = code.split("\n");
      const obj = {};
      arr.map((item) => {
        let [k, v] = item.split(":");
        v = v.replace(";", "").trim();
        // px转rem,比例为ratio
        if (v.endsWith("px")) {
          v = `${
            // ['width','height',  "font-size", "line-height"].includes(k) ? "" : 'rem'
            v.replace("px", '') / (["width", "height"].includes(k) ? 1 : ratio)
          }`;
        }
        obj[k] = v;
      });
      console.log("obj", obj, ratio);
      let re = "";
      let skips = [];
      const {
        width,
        height,
        left,
        top,
        color,
        "font-weight": fw,
        "font-size": fs,
        "line-height": lh = "",
        'border-radius': br,
        'box-shadow': bs
      } = obj;
      // 聚合left,top
      if (left && top) {
        // todo
        re += `@include pos(${left} ${top});\n`;
        skips.push("left", "top", 'position');
      }
      // 聚合width,height
      if (width && height) {
        re += `@include wh(${width} ${height});\n`;
        skips.push("width", "height");
      }
      // 聚合font: colot,font-weight,font-size,line-height
      if (color && fs) {
        re += `@include font(${color} ${fw || "normal"} ${fs} ${lh});\n`;
        skips.push("color", "font-weight", "font-size", "line-height");
      }
      if (br) {
        re += `border-radius: ${br}rem;\n`
        skips.push("border-radius");
      }
      if (bs) {
        const value = bs.split(' ').map(a => {
          if (a.endsWith('px')) {
            const v = Number(a.replace('px', '')) / ratio
            return v === 0 ? v : v + 'rem'
          }
          return a
        }).join(' ');
        re += `box-shadow: ${value};\n`
        skips.push("box-shadow");
      }
      for (const key in obj) {
        if (!skips.includes(key)) {
          re += `${key}: ${obj[key]};\n`;
        }
      }
      this.result = re;
    },
  },
};
</script>
<style scoped>
.ppw-wrapper {
  display: flex;
  align-items: center;
}
.input {
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
}
.pre {
  background: black;
  color: white;
  width: 400px;
  height: 300px;
  padding: 24px;
}
</style>
