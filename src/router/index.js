import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Upload from '../components/doctor/Upload.vue'
import MyFile from '../components/doctor/fileListPackage/MyFile'
import SharedFile from '../components/doctor/fileListPackage/SharedFile'
import BeSharedFile from '../components/doctor/fileListPackage/BeSharedFile'
import DoctorIndex from '../components/doctor/DoctorIndex.vue'
import AdminIndex from '../components/admin/AdminIndex.vue'
import AdminFileList from '../components/admin/AdminFileList.vue'
import AdminFile from '../components/admin/FileList.vue'
import Dashboard from '../components/admin/dashboard/index.vue'
import DashBoard from '../components/admin/DashBoard.vue'
import OrderMap from '../components/admin/OrderMap.vue'
import CenterHeader from '../components/admin/CenterHeader.vue'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'
import DoctorMain from '../components/doctor/DoctorMain.vue'
import AreaRank from '../components/admin/AreaRank.vue'
import AutoRank from '../components/admin/AutoRank.vue'
import Category from '../components/admin/Category.vue'

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
          {
            path:"/doctor/index",
            name: 'DoctorMain',
            component:DoctorMain
          },
          {
            path: '/doctor/upload',
            name: 'upload',
            component: Upload
          },
          {
            path: '/doctor/myFile',
            nameL: 'myFile',
            component: MyFile
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
        path: '/admin',
        name: 'AdminIndex',
        component: AdminIndex,
        
      },
        
         
      {
            path: '/admin/fileList',
            name: 'AdminFile',
            component: AdminFileList
      },
    
         
        
        
      
    
  ]
})