/**
 * 封装axios
 */
import axios from 'axios'
import user from '@/store/modules/user.js'
// import router from '@/router'
// import { response } from 'express'

const service = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    baseURL: 'http://elm.4399sy.com',
    timeout: 5000//请求延迟事件
})

// 请求拦截器 校验token
service.interceptors.request.use(
    config => {
        const token = user.state.token// Todo:改写为vuex
        // if(token){
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

//响应拦截器
service.interceptors.response.use(function(response) {
    //获取更新的token
    const { authorization } = response.headers;
    //如果token存在则存在localStorage
    authorization && localStorage.setItem('token', authorization);
    if(authorization){
        this.$store.state.user.token=authorization
    }
    return response;
  },
  function(error) {
    if (error.response) {
      const { status } = error.response;
      //如果401或405则到登录页
      if (status == 401 || status == 405) {
        history.push('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default service;
