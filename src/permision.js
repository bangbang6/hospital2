import router from '@/router/index'

import {getToken} from '@/utils/cookie'
//路由首位
router.beforeEach(async(to, from, next) => {
 
  console.log('router change');
  
  const hasToken = getToken('token')
  if(hasToken){
    if (to.path === '/' || to.path === '/register') {
      // if is logged in, redirect to the home page
      next({path:'/doctor'})
      
    }else{
      next()
    } 
  }else{
    if (to.path === '/' || to.path === '/register') {
      // if is logged in, redirect to the home page
      next()
      
    }else{
      next({path:'/'})
      alert('请先登录 ')
    } 
  }
  
   /* if (to.path === '/' || to.path === '/register') {
      // if is logged in, redirect to the home page
      next()
      
    } else {
      if (hasToken) {
        next()
      }else{
        router.push('/')
        alert('登录信息过期')
      }
    }*/
  })