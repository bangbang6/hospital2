import router from '@/router/index'

import {getToken} from '@/utils/cookie'
//路由首位
router.beforeEach(async(to, from, next) => {
 
  console.log('router change');
  
  const hasAdminToken = getToken('adminToken')
  const hasUserToken = getToken('userToken')
  /* if(hasToken){
    if (to.path === '/' || to.path === '/register') {
      // if is logged in, redirect to the home page
      next({path:'/doctor'})
      
    }else{
      next()
    } 
  }else{
    if (to.path === '/' || to.path === '/register' || to.path.indexOf('admin')>-1) {
      // if is logged in, redirect to the home page
      next()
      
    }else{
      next({path:'/'})
      alert('请先登录 ')
    } 
  } */
  if(to.path !== '/' &&  to.path!=='/register' &&to.path!=='/test'&&to.path!=='/sgxCenter'){
    if(to.path.indexOf('/admin')!==-1){
      if(hasAdminToken){
        next()
      }else{
        alert('尊敬的管理员请先登录')
        next({path:"/"})
      }
    }else if(to.path.indexOf('/doctor')!==-1){
      if(hasUserToken){
        next()
      }else{
        alert('请先登录')
        next({path:"/"})
      }
    }
  }else{
    next()
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