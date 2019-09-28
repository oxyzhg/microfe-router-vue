import { registerApplication, getAppNames } from 'single-spa';
import { resolve as resolveUrl } from 'url';
import http from './http';
import spaSdk from './spa-sdk';

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

export function loadApp(app) {
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
        resolve(e);
      });
    });
  };
}

export function activityApp(app) {
  return location => {
    const { name } = app;
    return location.pathname.startsWith(`/plugins/${name}`);
  };
}

function parseHtml(html, target) {
  const linkReg = /<link\s+.*?href="?(\S+\.css)"?\s+rel="?stylesheet"?[\s>]/gi;
  const scriptReg = /<script\s+.*?src="?(\S+\.js)"?[\s>]/gi;
  let links = [];
  let scripts = [];
  let temp = linkReg.exec(html);

  while (temp) {
    links.push(resolveUrl(target, temp[1]));
    temp = linkReg.exec(html);
  }
  temp = scriptReg.exec(html);
  while (temp) {
    scripts.push(resolveUrl(target, temp[1]));
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
    document.head.appendChild(el);
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
