import request from '../utils/request'

export function register(username,password){
  return request({
    url:'/register',
    data:{
      username:username,
      password:password
    },
    method:'post',
})
} 
export function login(username,password){
  return request({
    url:"/login",
    data:{
      username:username,
      password:password
    },
    method:'post'
  }
  )
}