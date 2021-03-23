import request from '../utils/request'
import {getToken} from '../utils/cookie'
export function upload(formData,channelId){
  return request(
    {
      url:'/data/uploadFile/'+channelId,
      method:'POST',
      data:formData,
      headers:{'Content-Type':'multipart/form-data',token:getToken('userToken')}
    }
  )
}

export function getFileList(){
  return request(
    {
      url:'/data/getDataList',
      method:"GET",
      headers:{
        token:getToken('userToken')
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
        token:getToken('userToken'),
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
      token:getToken('userToken'),

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
      token:getToken('userToken'),

    },
    data:{

      dataId:(+fileId),
      dataContent:message
    }
  })
}


export function backward(dataId){
  return request({
    url:'/trace/traceBackward',
    data:{
      dataId:dataId
    },
    method:'POST',
    headers:{
      token:getToken('userToken'),

    },
  })
}
export function backwardAgain(dataId,txId){
  return request({
    url:'/trace/traceBackwardAgain',
    data:{
      dataId:dataId,
      txId
    },
    method:'POST',
    headers:{
      token:getToken('userToken'),

    },
  })
}
/**
 *
 *获取用户上传文件
 * @export
 * @param {*} userId
 */
export function getMyFileList(userId){
  return request(
    {
      url:"/data/getDataListByOriginUserId",
      method:'GET',
      headers:{
        token:getToken('userToken'),
  
      },
    }
  )
}
/**
 *分享文件给其他用户
 *
 * @export
 * @param {*} sharedUserId
 * @param {*} sharedDataId
 * @returns
 */
export function shareFile(sharedUserId,sharedDataId){
  return request(
    {
      url:'/dataAuthority/sharedDataAuthorityOnSeeing',
      method:"POST",
      headers:{
        token:getToken('userToken'),
  
      },
      data:{
        sharedUserId,
        sharedDataId
      }
    }
  )
}

export function getAllBackward(dataId){
  return request({
    url:'/trace/traceBackwardForAll',
    data:{
      dataId:dataId
    },
    method:'POST',
    headers:{
      token:getToken('userToken'),

    },
  })
}

export function getYujianFiles(){
  return request({
    url:'/data/getInterChannelData',
    method:'get',
    headers:{
      token:getToken('userToken'),

    }
  })
}
export function getYuneiFiles(){
  return request({
    url:'/data/getCurrentChannelData',
    method:'get',
    headers:{
      token:getToken('userToken'),

    }
  })
}
export function pushData(dataId,channelId){
  return request({
    url:'/data/pushData',
    method:'post',
    data:{
      dataId,
      channelId
    },
    headers:{
      token:getToken('userToken'),

    }
  })
}
export function pullData(dataId,channelId){
  return request({
    url:'/data/pullData',
    method:'post',
    data:{
      dataId,
      channelId
    },
    headers:{
      token:getToken('userToken'),

    }
  })
}