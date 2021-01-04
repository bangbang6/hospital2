import axios from 'axios'

const request = axios.create({
  baseURL:'http://211.69.197.25:8080',
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
  err=>Promise.reject(err)
)
export default request