<template>
  <div>
    <input type='file' @change='parse' :disabled='dis'>
    <div>
      <Button style='margin: 16px 0' @click='copy'>Copy</Button>
      <pre id='code' style='background: #151718; color: white;padding: 12px'></pre>
    </div>
  </div>
</template>

<script>
let imported = false;
async function importResource() {
  if (imported) {
    return;
  }
  
  
  
}
export default {
  data() {
    return {
      value: '',
      dis: true,
    }
  },
  created() {
    const re = {
      type: 'script',
      url: 'https://pkg.oneitfarm.com/xlsx/0.17.5/xlsx.full.min.js' // 'https://unpkg.com/xlsx/dist/xlsx.full.min.js',
    };
    let el;
    el = document.createElement('script');
    el.src = re.url;
    el.type = 'text/javascript';
    el.async = true;
    el.onload = () => {
      this.dis = false;
      el.onload = null;
    };
    el.onerror = () => {
      this.dis = true;
    };
    document.head.appendChild(el);
  },
  methods: {
    async parse(e) {
      const file = e.target.files[0];
      console.log('change', file, window.XLSX.utils);
      const res = await this.importExcel(file);
      console.log(res, 'res');
      // this.exportXlsx(res, file.name.split('.')[0])
      const zh = "zh-CN";
      const en = "en-US";
      const obj = {
        "zh-CN": {

        },
        "en-US": {

        }
      };
      res.map(item => {
        const { pageId, key, "zh-CN": zhStr, "en-US": enStr, } = item;
        if (!obj[zh][pageId]) {
          obj[zh][pageId] = {
            [key]: zhStr,
          }
        } else {
           obj[zh][pageId][key] = zhStr;
        }
        if (!obj[en][pageId]) {
          obj[en][pageId] = {
            [key]: zhStr,
          }
        } else {
           obj[en][pageId][key] = enStr;
        }
      });
      console.log(obj, 'obj');
      const code = `export default ${
        JSON.stringify(obj, null, ' ')
      }`;
      document.getElementById('code').innerText = code;
    },
    async  exportXlsx(data, filename, sheetname = 'Sheet1') {
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('data must be array');
      }
      if (!filename) {
        throw new Error('filename is required');
      }
      await importResource();
      const keys = Object.keys(data[0]);
      const result = [keys];
      data.map((d) => {
        result.push(Object.values(d));
      });
      const wb = window.XLSX.utils.book_new();
      const ws = window.XLSX.utils.aoa_to_sheet(result);
      window.XLSX.utils.book_append_sheet(wb, ws, sheetname);
      filename = filename.endsWith('.xlsx') ? filename : filename + '.xlsx';
      window.XLSX.writeFile(wb, filename);
    },
    async importExcel(file, sheetname = '') {
      await importResource();
      const data = await this.getFileContent(file);
      const workbook = window.XLSX.read(data, { type: 'binary' });
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        throw new Error('sheet not found');
      }
      sheetname = sheetname ? sheetname : workbook.SheetNames[0];
      const result = window.XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);
      return result;
    },
    async  getFileContent(file){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async function (e) {
          resolve(e.target.result);
        }
        reader.onerror = () => {
          reject();
        }
        reader.readAsBinaryString(file);
      });
    },
     copy() {
       const text = document.getElementById('code').innerText;
      var input = document.createElement('input');
      input.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
      input.setAttribute('value', text);
      document.body.appendChild(input);
      // input.setSelectionRange(0, 9999);
      input.select();
      var res = document.execCommand('copy');
      document.body.removeChild(input);
    return res;
}

  }
}
</script>
<style scoped>

</style>