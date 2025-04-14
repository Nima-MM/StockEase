import axios from 'axios';

const TIMEOUT = 1000000;
const onRequestSuccess = (config: any) => {
  const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.timeout = TIMEOUT;
  config.url = `${SERVER_API_URL}${config.url}`;
  return config;
};
const setupAxiosInterceptors = (onUnauthenticated: any, onServerError: any) => {
  const onResponseError = (err: any) => {
    const status = err.status || err.response.status;
    if (status === 403 || status === 401) {
      return onUnauthenticated(err);
    }
    if (status >= 500) {
      return onServerError(err);
    }
    return Promise.reject(err);
  };

  if (axios.interceptors) {
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(res => res, onResponseError);
  }
};

export { onRequestSuccess, setupAxiosInterceptors };
