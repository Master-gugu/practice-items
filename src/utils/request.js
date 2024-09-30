import axios from 'axios';

const instance = axios.create({
    baseURL: '/api', // 访问服务端的路径
    timeout: 1000 * 1000 * 6, // 请求接口超时时间
});

// 设置Cros跨域可以携带cookie。不然在跨域的情况下无法携带cookie
instance.defaults.withCredentials = true;

// 添加请求拦截
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log('请求前', config);
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('响应后', response)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;