import request from '../utils/request'
import {getToken} from '../utils/cookie'
/**
 * 单个用户获取权限
 */
export function checkChannel(){
  return request(
    {
      url:'/channel/getAddAuthorityChannels',
      method:'GET',
      headers:{token:getToken('token')}
    }
  )
}
/**
 * 管理员页面获取所有用户权限
 */
export function getAllUserChannel(){
  return request(
    {
      url:'/channel/getAllAuthorityChannels',
      method:'GET',

    }
  )
}
/**
 * 管理员增加权限
 * @param {*} userId 
 * @param {*} channelId 
 * @param {*} authorityKey 
 */
export function addChannel(userId,channelId,authorityKey = 1){
  return request(
    {
      url:'/channel/addChannelAuthority',
      method:'POST',
      data:{
        userId,
        channelId,
        authorityKey
      }
    }
  )
}
/**
 *管理员删除权限
 *
 * @export
 * @param {*} userId
 * @param {*} channelId
 * @param {number} [authorityKey=1]
 * @returns
 */
export function deleteChannel(userId,channelId,authorityKey = 1){
  return request(
    {
      url:'/channel/deleteChannelAuthority',
      method:'POST',
      data:{
        userId,
        channelId,
        authorityKey
      }
    }
  )
}