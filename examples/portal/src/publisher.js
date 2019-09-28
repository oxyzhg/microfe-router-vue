import { getMountedApps } from 'single-spa';

class Publisher {
  constructor() {
    this.handlers = new Map();
    this.fnArr = {};
  }

  on(eventType) {
    const event = document.createEvent('HTMLEvents');

    event.initEvent(eventType, false, true);
    this.handlers.set(eventType, event);

    if (!this.fnArr[eventType]) {
      this.fnArr[eventType] = [];
    }
  }

  saveEvent(eventType, event) {
    this.fnArr[eventType].push(event);
  }

  getEvent(eventType) {
    for (let i = 0; i < this.fnArr[eventType].length; i++) {
      window.dispatchEvent(this.fnArr[eventType][i]);
    }
    this.fnArr[eventType] = [];
  }

  // 触发事件
  emit(eventType, obj) {
    if (!this.handlers.has(eventType)) return this;
    let event = this.handlers.get(eventType);
    event.data = obj;
    const apps = getMountedApps();
    if (apps.find(i => i === eventType)) {
      window.dispatchEvent(event);
    } else {
      this.saveEvent(eventType, event);
    }
  }
}

export default Publisher;
