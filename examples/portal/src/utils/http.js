import axios from 'axios';
import qs from 'qs';

class Http {
  constructor() {
    this.xhr = this.create({
      baseURL: 'http://yapi.demo.qunar.com/mock/54093/api',
      timeout: 3000
    });
  }

  create(config = {}, reqInterceptors, resInterceptors) {
    const instance = axios.create(config);
    const contentType = 'application/x-www-form-urlencoded;charset=UTF-8';

    instance.defaults.headers.post['Content-Type'] = contentType;
    instance.defaults.headers.put['Content-Type'] = contentType;
    instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        if (config.method === 'post' || config.method === 'put') {
          config.data = qs.stringify(config.data);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      response => {
        return response.data || response;
      },
      error => {
        const { response } = error;
        if (response) {
          return Promise.reject(response);
        } else {
          console.error('连接到服务器失败');
        }
      }
    );
    return instance;
  }

  request({ method, url, params, data, headers }) {
    const options = {
      method,
      url,
      params,
      headers
    };
    if (data) options.data = data;
    return this.xhr(options);
  }

  get(url, params, headers) {
    const options = {
      method: 'get',
      url,
      params,
      headers
    };
    return this.request(options);
  }

  post(url, data, params, headers) {
    const options = {
      method: 'post',
      url,
      data,
      params,
      headers
    };
    return this.request(options);
  }

  put(url, params, headers) {
    const options = {
      method: 'put',
      url,
      params,
      headers
    };
    return this.request(options);
  }

  delete(url, params, headers) {
    const options = {
      method: 'delete',
      url,
      params,
      headers
    };
    return this.request(options);
  }
}

export default new Http();
