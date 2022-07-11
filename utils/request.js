// 此文件没用了
/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'

// 创建请求对象(基于axios创建实例，这种方式更灵活，不会污染全局的请求对象)
const request = axios.create({
  // 基础路径
  baseURL: 'http://realworld.api.fed.lagounews.com'
  // baseURL: 'https://conduit.productionready.io'
})

// 请求拦截器

// 响应拦截器

export default request
