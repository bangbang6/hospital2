<template>
  <div class="loginWrapper">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" type="text" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password" style="margin-bottom: 18px;">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <div style="margin-left: 80px">
        <el-radio v-model="radio1" label="1" @change="radioconfirm('1')">医生</el-radio>
        <el-radio v-model="radio1" label="2" @change="radioconfirm('2')">管理员</el-radio>
      </div>
      <el-form-item style="margin-top: 18px;">
        <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
        <el-button type="warning" @click="toRegister()">注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { login } from '../../api/user'
import { adminLogin } from '../../api/admin'
import { setToken } from '@/utils/cookie'
export default {
  name: 'Login',
  data () {
    return {
      radio1: '1',
      form: {
        username: '',
        password: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit (formName) {

      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //普通用户登录
          if (this.radio1 === '1') {
            login(this.form.username, this.form.password).then(res => {
              console.log(res);


              if (res.data.code === 200) {
                const userData = res.data.data
                console.log('userData', userData);
                setToken('userToken', userData.token)
                localStorage.setItem('userHospital', userData.hospitalName)
                localStorage.setItem('userName', userData.user.username)

                // 调用elementUI的加载层
                const loading = this.$loading({
                  lock: true,
                  text: '登录成功! 即将进入系统',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                  // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                  this.$router.push('/doctor/myFile'); loading.close()

                }, 1000)
              } else {
                alert(res.data.message)
              }
            })
          } else if (this.radio1 === '2') {
            adminLogin(this.form.username, this.form.password).then(res => {
              console.log(res);


              if (res.data.code === 200) {
                const userData = res.data.data
                console.log('userData', userData);
                setToken('adminToken', userData.token)
                localStorage.setItem('adminHospital', userData.hospitalName)
                localStorage.setItem('adminName', userData.user.username)

                // 调用elementUI的加载层
                const loading = this.$loading({
                  lock: true,
                  text: '登录成功! 即将进入系统',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                  // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                  this.$router.push('/admin/dashboard'); loading.close()

                }, 1000)
              } else {
                alert(res.data.message)
              }
            })
          }


        } else {
          this.dialogVisible = true
          return false
        }
      })
    },
    radioconfirm (index) {
      this.radio1 = index
    },
    toRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
body {
  background-size: 100% 100%;
  background: url(../../assets/backgroud.jpg) no-repeat fixed center center;
}
.loginWrapper {
  position: relative;
  top: 50%;
  margin-top: -200px;
}
.login-box {
  background-color: #ffffff4d;
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 0 auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
