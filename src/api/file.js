import request from '../utils/request'
import {getToken} from '../utils/cookie'
export function upload(formData,channelId){
  return request(
    {
      url:'/data/uploadFile/'+channelId,
      method:'POST',
      data:formData,
      headers:{'Content-Type':'multipart/form-data',token:getToken('token')}
    }
  )
}

export function getFileList(){
  return request(
    {
      url:'/data/getDataList',
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
      url:'/data/deleteDataById',
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

export function getFile(fileId){
  return request({
    url:"/data/getData",
    method:'POST',
    headers:{
      token:getToken('token'),

    },
    data:{
      dataId:(+fileId)
    }
  })
}

export function updateFile(message,fileId){
  return request({
    url:"/data/updateData",
    method:'POST',
    headers:{
      token:getToken('token'),

    },
    data:{

      dataId:(+fileId),
      dataContent:message
    }
  })
}