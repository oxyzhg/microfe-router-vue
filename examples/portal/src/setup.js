import { registerApplication, start, getAppNames } from 'single-spa';
import URL from 'url';
import http from '@/utils/http';
import spaSdk from '@/utils/spa-sdk';
import PortalRouter, { registerRoutes } from './utils/microfe-vue-router';
import VueRouter from './router';

const plugins = [
  {
    name: 'app1',
    entry: '/#/',
    url: 'http://localhost:7002',
    type: 'spa'
  }
];

const PR = new PortalRouter(
  VueRouter,
  {
    path: '/plugins',
    component: resolve => require(['@/views/Parcel.vue'], resolve)
  },
  '/plugins'
);

function parseHtml(html, target) {
  const linkReg = /<link\s+.*?href="?(\S+\.css)"?\s+rel="?stylesheet"?[\s>]/gi;
  const scriptReg = /<script\s+.*?src="?(\S+\.js)"?[\s>]/gi;
  let links = [];
  let scripts = [];
  let temp = linkReg.exec(html);

  while (temp) {
    links.push(URL.resolve(target, temp[1]));
    temp = linkReg.exec(html);
  }
  temp = scriptReg.exec(html);
  while (temp) {
    scripts.push(URL.resolve(target, temp[1]));
    temp = scriptReg.exec(html);
  }

  return {
    links,
    scripts
  };
}

function loadJS(url) {
  return new Promise(resolve => {
    let el = document.querySelector(`script[src="${url}"]`);

    if (el) {
      return resolve();
    }

    el = document.createElement('script');
    el.onload = resolve;
    el.type = 'text/javascript';
    el.async = false;
    el.src = url;
    document.body.appendChild(el);
  });
}

function loadCSS(url) {
  return new Promise(resolve => {
    let el = document.querySelector(`link[href="${url}"]`);

    if (el) {
      return resolve();
    }

    el = document.createElement('link');
    el.onload = resolve;
    el.rel = 'stylesheet';
    el.async = false;
    el.href = url;
    document.head.appendChild(el);
  });
}

function loadApp(app) {
  const { name, url } = app;
  const origin = window.location.origin;
  const appURL = url || `${origin}/${name}`;

  return async config => {
    const doc = await http.get(appURL);
    const { scripts, links } = parseHtml(doc, appURL);

    links.map(url => loadCSS(url));
    scripts.map(url => loadJS(url));

    return new Promise(resolve => {
      spaSdk.onAppLoaded(name, e => {
        console.log('load app', e);
        console.log(name);
        const { router, store } = e.appOptions;
        const { options } = router;
        // console.log(e.appOptions);
        PR.register(options, name);
        resolve(e);
      });
    });
  };
}

function activityApp(app) {
  return location => {
    const { name } = app;
    return location.pathname.startsWith(`/plugins/${name}`);
  };
}

export function registerApp(applist) {
  const declared = getAppNames();
  applist
    .filter(app => app.type === 'spa')
    .forEach(app => {
      if (!declared.includes(app.name)) {
        registerApplication(app.name, loadApp(app), activityApp(app));
      }
    });
}

export default function setup() {
  registerApp(plugins);
  start();
}
