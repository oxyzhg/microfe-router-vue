import singleSpaVue from 'single-spa-vue';

class SpaSdk {
  constructor(options) {
    this.app = {};
    // this.instance = null;
    this.instance = {};
    this.options = Object.assign(
      {
        container: 'module-wrap'
      },
      options
    );
  }

  setConfig(config) {
    this.config = this.config ? Object.assign(this.config, config) : config;
  }

  getConfig() {
    return this.config;
  }

  setRouter(router) {
    this.router = router;
  }

  getRouter() {
    return this.router;
  }

  setStore(store) {
    this.store = store;
  }

  getStore() {
    return this.store;
  }

  on(event, cb) {
    return window.addEventListener(event, cb);
  }

  once(event, cb) {
    return window.addEventListener(event, e => {
      cb && cb(e);
      this.off(event, cb);
    });
  }

  off(event, cb) {
    return window.removeEventListener(event, cb);
  }

  emit(event, data) {
    const e = new CustomEvent(event, {
      detail: data
    });

    return window.dispatchEvent(e);
  }

  mountVue(name, Vue, appOptions) {
    const vueLifecycles = singleSpaVue({ Vue, appOptions });
    const customLifecycles = {
      appOptions,
      bootstrap: vueLifecycles.bootstrap,
      mount: props => {
        // console.log('mount props', props);
        // return vueLifecycles.mount(props);
        return Promise.resolve().then(() => {
          // this.createDomElement(appOptions);
          this.instance[name] = new Vue(appOptions);
          // vueLifecycles.mount();
        });
      },
      unmount: props => {
        return Promise.resolve().then(() => {
          this.deleteDomElement(name);
          this.instance[name].$destroy();
          delete this.instance[name];
          delete this.app[name];
          // vueLifecycles.unmount(props);
        });
      }
    };
    this.app[name] = customLifecycles;
    this.emit(`${name}:app.loaded`, customLifecycles);
    return customLifecycles;
  }

  onAppLoaded(name, cb) {
    this.on(`${name}:app.loaded`, e => {
      cb && cb(e.detail);
    });
  }

  createDomElement(options) {
    let root = document.getElementById(this.options.container);
    let el = document.querySelector(options.el);

    if (!el) {
      el = document.createElement('div');
      el.id = options.el.replace(/^#/g, '');
      root.appendChild(el);
    }
    return el;
  }

  deleteDomElement(appName) {
    const id = this.instance[appName].$el.id;
    const el = document.getElementById(id);

    if (el) {
      el.innerHTML = `${appName} 已删除`;
      el.id = this.options.container;
    }
    return el;
  }

  get(namespace) {
    if (!this.store) {
      return null;
    }

    const keys = namespace.split('.');
    const state = this.store.state || {};

    return keys.reduce((prev, key) => {
      if (!prev) {
        return null;
      } else {
        return prev[key];
      }
    }, state);
  }
}

let spaSdk = window._spa_sdk || window._spa_helper;

if (!spaSdk) {
  spaSdk = new SpaSdk();
  window._spa_sdk = spaSdk;
}

export default spaSdk;
