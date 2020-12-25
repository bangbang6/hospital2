import Cookies from 'js-cookie'
const  inFifteenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey,token) {
  return Cookies.set(TokenKey, token,{
    expires: inFifteenMinutes
})
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}
