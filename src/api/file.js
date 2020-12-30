import request from '../utils/request'
import {getToken} from '../utils/cookie'
export function upload(formData){
  return request(
    {
      url:'/uploadFile',
      method:'POST',
      data:formData,
      headers:{'Content-Type':'multipart/form-data',token:getToken('token')}
    }
  )
}

export function getFileList(){
  return request(
    {
      url:'/getDataList',
      method:"GET",
      headers:{
        token:getToken('token')
      }
    }
  )
}
export function deleteFile(fileId){
  return request(
    {
      url:'/deleteDataById',
      method:"POST",
      headers:{
        token:getToken('token'),
      },
      data:{
        
        dataId:(+fileId),
        
      }
    }
  )
}