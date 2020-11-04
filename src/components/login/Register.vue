<template>
  <div class="registerWrapper">
    <el-form ref="registerForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎注册</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" type="text" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password" style="margin-bottom: 18px">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword" style="margin-bottom: 18px">
        <el-input v-model="form.repassword" type="password" placeholder="请再次输入密码" />
      </el-form-item>
      <el-form-item style="margin-top: 25px;">
        <el-button type="warning" @click="toLogin(&quot;registerForm&quot;)">点击注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible1" width="30%">
      <span>请填写完整</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="温馨提示" :visible.sync="dialogVisible2" width="30%">
      <span>两次输入的密码不一致，请重新输入</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      radio1: '1',
      form: {
        username: '',
        password: '',
        repassword: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          { required: true, message: '账号不可为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可为空', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '确认密码不可为空', trigger: 'blur' }
        ]
      },
      // 对话框显示和隐藏
      dialogVisible1: false,
      dialogVisible2: false
    }
  },
  methods: {
    toLogin (formName) {
      console.log('xxx');
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.password === this.form.repassword) {
            // 调用elementUI的加载层
            const loading = this.$loading({
              lock: true,
              text: '注册成功! 即将进入系统',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
              this.$router.push('/doctor') // 强制切换当前路由 path

              loading.close()
            }, 1000)
          } else {
            this.dialogVisible2 = true
            return false
          }
        } else {
          this.dialogVisible1 = true
          return false
        }
      })

    }
  }

}
</script>

<style>
body {
  background-size: cover;
  background: url(../../assets/backgroud.jpg) no-repeat fixed center center;
}
.registerWrapper {
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
