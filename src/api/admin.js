import request from '../utils/request'

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