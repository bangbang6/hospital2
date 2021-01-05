import request from '../utils/request'
import {getToken} from '../utils/cookie'
export function checkChannel(){
  return request(
    {
      url:'/channel/getAddAuthorityChannels',
      method:'GET',
      headers:{token:getToken('token')}
    }
  )
}