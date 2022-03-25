export default class Resource {
  /**
   * 注册远程entry
   *
   * @static
   * @param {string} pakcageName 包名，比如：@idg/gui
   * @param {string} remoteEntry 地址，比如：//pkg.oneitfarm.com
   * @memberof Resource
   */
  static registerRemoteEntry(pakcageName, remoteEntry) {
      if (Resource.remoteEntries[pakcageName]) {
          return;
      }
      Resource.remoteEntries[pakcageName] = remoteEntry;
  }
  /**
   * 加载一个cdn静态资源
   *
   * @static
   * @param {ResourceDef[]} resources
   * @returns {Promise<any>}
   * @memberof Resource
   */
  static import(resources) {
      const promises = [];
      resources.forEach((resource) => {
          promises.push(new Promise((resolve, reject) => {
              if (Resource.loadedResources[resource.url]) {
                  resolve(Resource.loadedResources[resource.url]);
              }
              else {
                  const el = Resource.createElement(resource);
                  el.onload = (res) => {
                      resolve(res);
                      el.onload = null;
                  };
                  el.onerror = () => {
                      reject('load error');
                  };
                  document.head.appendChild(el);
              }
          }));
      });
      return Promise.all(promises);
  }
  /**
   * 加载一个webpack remoteEntry
   *
   * @static
   * @param {string} url 地址
   * @param {string} scope 命名空间
   * @param {string} [module='.'] 模块
   * @returns
   * @memberof Resource
   */
  static async loadRemoteEntry(remoteEntry, scope, module = '.') {
      if (Resource.scopeModules[scope]) {
          return Resource.scopeModules[scope];
      }
      let url;
      if (typeof remoteEntry === 'string') {
          url = remoteEntry;
      }
      else {
          url = remoteEntry();
      }
      const splits = url.split('/');
      const index = splits.findIndex(s => s === '@idg');
      let packageName;
      if (index >= 0 && splits[index + 1]) {
          packageName = `@idg/${splits[index + 1]}`;
      }
      if (packageName && Resource.remoteEntries[packageName]) {
          url = Resource.remoteEntries[packageName];
      }
      if (!url.includes('//')) {
          throw new Error('invalid url');
      }
      await this.import([{
              url,
              type: 'script'
          }]);
      // tslint:disable-next-line:no-any
      const w = window;
      // Initializes the share scope. This fills it with known provided modules from this build and all remotes
      await __webpack_init_sharing__("default");
      const container = w[scope]; // or get the container somewhere else
      // Initialize the container, it may provide shared modules
      await container.init(__webpack_share_scopes__.default);
      const factory = await w[scope].get(module);
      const Module = factory();
      Resource.scopeModules[scope] = Module;
      return Module;
  }
  static createElement(resource) {
      let el;
      if (resource.type === 'script') {
          el = document.createElement('script');
          el.src = resource.url;
          el.type = 'text/javascript';
          el.async = true;
      }
      else {
          el = document.createElement('link');
          el.type = 'text/css';
          el.rel = 'stylesheet';
          el.href = resource.url;
      }
      return el;
  }
}
Resource.loadedResources = {};
Resource.remoteEntries = {};
Resource.scopeModules = {};
