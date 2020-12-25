import request from '../utils/request'

export function upload(formData){
  return request(
    {
      url:'/uploadFile',
      method:'POST',
      data:formData,
      headers:{'Content-Type':'multipart/form-data',token:localStorage.getItem('token')}
    }
  )
}