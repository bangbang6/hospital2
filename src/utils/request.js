import axios from 'axios'

const request = axios.create({
  baseURL:"http://2qo2220292.imwork.net:45056/",
  // baseURL:"http://211.69.198.53:8070",
  timeout:100000
})
request.interceptors.response.use(
  
  response=>{
    if(response.status == 200){
      return response
    }else{
      
     return Promise.reject(new Error('请求失败'))
    }
  },
  err=>{
    return Promise.reject(err)}
)
export default request