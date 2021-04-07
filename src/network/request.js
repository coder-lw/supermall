import axios from 'axios'
//封装函数
export function request(config){
  // 创建实例axios
  const instance = axios.create({
    baseURL:"http://152.136.185.210:8000/api/z8",
    timeout:5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {

  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })


  // 发送真正的请求
  return instance(config)
}
















