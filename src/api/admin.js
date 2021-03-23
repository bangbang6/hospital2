import request from '../utils/request'
import {getToken} from '../utils/cookie'
export function getAuthority(){
  return request({
    url:'/dataAuthority/getAllAuthority',
    method:'GET',
    headers:{token:getToken('adminToken')}
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
/**
 *返回根据chanel分类的user列表
 *
 * @export
 * @returns
 */
export function getGroupedUserList(){
  return request({
    url:"/user/getGroupedUserList",
    method:'GET',
    headers:{token:getToken('adminToken')}
  })
}
/**
 *返回根据channel分类的file列表
 *
 * @export
 * @returns
 */
export function getGroupedDataList(){
  return request({
    url:"/data/getGroupedDataList",
    method:'GET',
    headers:{token:getToken('adminToken')}
  })
}

export function addPullAuthority(channelId,dataId,userId,type=2){
  return request({
    url:"/innerChannelAuthority/addPullAuthority",
    data:{
      type,
      channelId,
      dataId,
      userId
    },
    headers:{token:getToken('adminToken')},
    method:'POST'
  })
}
export function addPushAuthority(channelId,dataId,userId,type=1){
  return request({
    url:"/innerChannelAuthority/addPushAuthority",
    data:{
      type,
      channelId,
      dataId,
      userId
    },
    headers:{token:getToken('adminToken')},
    method:'POST'
  })
}
//获取域间pull权限列表
export function getPullAuthorityList(){
  return request({
    url:"/innerChannelAuthority/getPullAuthorityList",
    method:'GET',
    headers:{token:getToken('adminToken')}
  })
}
//获取域内pull权限列表
export function getPushAuthorityList(){
  return request({
    url:"/innerChannelAuthority/getPushAuthorityList",
    method:'GET',
    headers:{token:getToken('adminToken')}
  })
}

//删除pull权限
export function deletePullAuthority(channelId,dataId,userId,type=2){
  
  return request({
    url:"/innerChannelAuthority/deletePullAuthority",
    method:"POST",
    headers:{token:getToken('adminToken')},
    data:{
      type,
      channelId,
      dataId,
      userId
    },

  })
}
//删除pull权限
export function deletePushAuthority(channelId,dataId,userId,type=1){
  return request({
    url:"/innerChannelAuthority/deletePushAuthority",
    method:"POST",
    headers:{token:getToken('adminToken')},
    data:{
      type,
      channelId,
      dataId,
      userId
    },
  })
}