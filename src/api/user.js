import request from '../utils/request'
import {getToken} from '../utils/cookie'
export function register(username,password,channelId){
  return request({
    url:'/user/register',
    data:{
      username:username,
      password:password,
      channelId
    },
    method:'post',
})
} 
export function login(username,password){
  return request({
    url:"user/login",
    data:{
      username:username,
      password:password
    },
    method:'post'
  }
  )
}
/**
 *分享文件时候获取到所有无权限的用户
 *
 * @export
 * @param {*} shareDataId
 * @returns
 */
export function getUserExceptMe(sharedDataId){
  return request(
    {
      url:'/user/getUserExceptMeOnSharing',
      method:'POST',
      data:{
        sharedDataId:+sharedDataId
      },
      headers:{
        token:getToken('userToken'),
      },
    }
  )

}

export function getSharedUserOnPush(dataId){
  return request(
    {
      url:'/user/getSharedUserOnPush?dataId='+dataId,
      method:'GET',
      // data:{
      //   dataId:dataId
      // },
      headers:{
        token:getToken('userToken'),
      },
    }
  )
}