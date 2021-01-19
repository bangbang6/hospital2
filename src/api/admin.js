import request from '../utils/request'
import {getToken} from '../utils/cookie'
export function getAuthority(){
  return request({
    url:'/dataAuthority/getAllAuthority',
    method:'GET'
  })
}

export function addAuthority(userId,dataSampleId,authorityKey){
  return request({
    url:'/dataAuthority/addDataAuthority',
    data:{
      userId,
      dataSampleId,
      authorityKey
    },
    method:'POST',
  })
}

export function deleteAuthority(userId,dataSampleId,authorityKey){
  return request({
    url:'/dataAuthority/deleteDataAuthority',
    data:{
      userId,
      dataSampleId,
      authorityKey
    },
    method:'POST'
  })
}
/**
 *admin 获取当前channel用户分享文件的请求
 *
 * @export
 */
export function getAllRequest(){
  return request(
    {
      url:'/dataAuthority/receiveAllSharedDataMsg',
      method:'GET',
      headers:{token:getToken('adminToken')}
    }
  )
}

export function adminLogin(username,password){
  return request(
    {
      url:'/user/adminLogin',
      data:{
        username:username,
        password:password
      },
      method:'post'
    }
  )
}
export function adminConfirmRequest(shareUserId,sharedUserId,sharedDataId,confirmOrNot=1,authorityKey=1){
  return request({
    url:'/dataAuthority/confirmSharedDataMsgOrNot',
    method:'POST',
    data:{
      shareUserId,
      sharedUserId,
      sharedDataId,
      confirmOrNot,
      authorityKey
    },
    headers:{token:getToken('adminToken')}

  })
}