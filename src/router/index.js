import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Upload from '../components/doctor/Upload.vue'
import FileList from '../components/doctor/FileList.vue'
import DoctorIndex from '../components/doctor/DoctorIndex.vue'
import AdminIndex from '../components/admin/AdminIndex.vue'
import AdminFile from '../components/admin/FileList.vue'
import Dashboard from '../components/admin/dashboard/index.vue'
import Login from '../components/login/Login.vue'
import Register from '../components/login/Register.vue'

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
        redirect: '/doctor/fileList',
        children: [
  
          {
            path: '/doctor/upload',
            name: 'upload',
            component: Upload
          },
          {
            path: '/doctor/fileList',
            nameL: 'fileList',
            component: FileList
          }
        ]
      },
      {
        path: '/admin',
        name: 'AdminIndex',
        component: AdminIndex,
        redirect: '/admin/index',
  
        children: [
  
          {
            path: '/admin/fileList',
            nameL: 'AdminFile',
            component: AdminFile
          },
          {
            path: '/admin/index',
            nameL: 'Dashboard',
            component: Dashboard
          }
        ]
      }
    
  ]
})