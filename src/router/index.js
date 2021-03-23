import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Upload from '../components/doctor/Upload.vue'
import MyFile from '../components/doctor/fileListPackage/MyFile'
import SharedFile from '../components/doctor/fileListPackage/SharedFile'
import BeSharedFile from '../components/doctor/fileListPackage/BeSharedFile'
import DoctorIndex from '../components/doctor/DoctorIndex.vue'
import DashBoard from '../components/admin/DashBoardAdmin.vue'
import Yujian from '../components/admin/yujian/Yujian.vue'
import Yunei from '../components/admin/yunei/Yunei.vue'
import AdminFileList from '../components/admin/AdminFileList.vue'

import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'
import DoctorMain from '../components/doctor/DoctorMain.vue'
import simpleUpload from '../components/simpleUpload'
import AdminAuthorize from '../components/admin/Authorize'
import Channel from '../components/admin/Channel'
import BackWard from '../components/doctor/NewBackward'
import UserRequest from '../components/admin/UserRequest'
import MainAdmin from '../components/admin/MainAdmin'
import allFile from '../components/doctor/fileListPackage/allFileTab'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({

    routes: [
      {
        path: '/',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      
      {
        path: '/doctor',
        name: 'DoctorIndex',
        component: DoctorIndex,
        redirect: '/doctor/index',
        children: [
          /* {
            path:"/doctor/index",
            name: 'DoctorMain',
            component:DoctorMain
          },
          {
            path: '/doctor/upload',
            name: 'upload',
            component: Upload
          }, */
          {
            path: '/doctor/simpleUpload',
            name: 'simpleUpload',
            component: simpleUpload
          },
          {
            path: '/doctor/backward',
            name: 'BackWard',
            component: BackWard
          },
          {
            path: '/doctor/myFile',
            name: 'myFile',
            component: MyFile
          },
          {
            path: '/doctor/allFile',
            name: 'allFile',
            component: allFile
          },
            {
                path: '/doctor/sharedFile',
                nameL: 'sharedFile',
                component: SharedFile
            },
            {
                path: '/doctor/beSharedFile',
                nameL: 'beSharedFile',
                component: BeSharedFile
            },
        ]
      },
      {
        path: '/admin/dashboard',
        name: 'DashBoard',
        component: DashBoard,
      
        
      },
      {
        path:'/admin',
        name:"Admin",
        component:MainAdmin,
        children:[
          {
            path: '/admin/authorize',
            name: 'AdminAuthorize',
            component: AdminAuthorize,
            
          },
          {
            path: '/admin/yunei',
            name: 'yunei',
            component: Yunei,
            
          },
          {
            path: '/admin/userRequest',
            name: 'UserRequest',
            component: UserRequest,
            
          },
          {
            path: '/admin/yujian',
            name: 'yujian',
            component: Yujian,
            
          },
            
             
          {
                path: '/admin/fileList',
                name: 'AdminFile',
                component: AdminFileList
          },
        
          {
                path: '/admin/channel',
                name: 'Channel',
                component: Channel
          },
        ]
      }
      
    
         
        
        
      
    
  ]
})