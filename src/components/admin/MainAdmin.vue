<template>
  <div class="admin">
    <div class="header">
      <div class="content">
        <div class="bai"></div>
        <div class="title">{{title}}</div>

        <div class="wrapper">
          <div class="text">{{userInfo}}</div>
          <div class="user">
            <div class="avaturl">
              <el-dropdown trigger="click" @command="handleCommand">
                <img src="../../assets/avaturl.jpg" class="imgAvaturl" />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-pie-chart" command="jumpToshouye">首页</el-dropdown-item>

                  <!-- <el-dropdown-item icon="el-icon-user" command="jumpToYunei">域内设置</el-dropdown-item>

                  <el-dropdown-item icon="el-icon-folder-opened" command="jumpToYujian">域间设置</el-dropdown-item>-->
                  <el-dropdown-item icon="el-icon-folder-opened" command="jumpToSgxCenter">sgx中心节点</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-warning-outline" command="jumpToYujin">异常预警</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-turn-off" command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <!--  <router-view></router-view> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import DashBoard from './DashBoard.vue';
import { removeToken } from '@/utils/cookie';
export default {
  components: { DashBoard },
  data () {
    return {
      activeIndex: '0',
      inputValue: '',
      paths: ['/admin/index', '/admin/fileList'],
      title: ''
    };
  },
  computed: {
    userInfo () {
      return `${localStorage.getItem('adminName')}`
    }
  },
  methods: {
    handleSelect (key) {
      let num = parseInt(key)
      this.$router.push(this.paths[num])
    },
    handleCommand (command) {

      if (command === 'jumpToshouye') {
        this.$router.push('/admin/dashboard')
      }
      if (command === 'jumpToRequest') {
        this.$router.push('/admin/userRequest')
      }
      if (command === 'jumpToSgxCenter') {
        this.$router.push('/admin/sgxCenter')
      }
      if (command === 'jumpToAuth') {
        this.$router.push('/admin/authorize')
      }
      if (command === 'jumpToYunei') {
        this.$router.push('/admin/yunei')
      }

      if (command === 'jumpToChannel') {
        this.$router.push('/admin/channel')
      }
      if (command === 'loginout') {
        removeToken('adminToken')
        localStorage.removeItem('adminHospital')
        localStorage.removeItem('adminName')
        this.$router.push('/')
      }
      if (command === 'jumpToYujian') {

        this.$router.push('/admin/yujian')
      }
      if (command === 'jumpToYujin') {

        this.$router.push('/admin/errorStatus')
      }
    },

  },
  watch: {
    $route: {
      handler (to, from) {

        switch (to.name) {
          case 'UserRequest':
            this.title = '用户请求页面';
            break;
          case 'Channel':
            this.title = '通道设置页面';
            break;
          case 'AdminAuthorize':
            this.title = '文件设置页面';
            break;
          case 'yujian':
            this.title = '域间权限设置';
            break;
          default:
            this.title = '';
            break;

        }
      },
      immediate: true
    }

  }
}
</script>

<style scoped>
.admin {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 8%;
}

.menu,
.logo {
  float: left;
}
.el-menu {
  border-bottom: solid 0 white !important;
}
.content {
  margin-left: 15%;
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-around;
}
.logo {
  width: 60px;
  height: 40px;
  margin-top: 10px;
}
.imgLogo {
  width: 40px;
  height: 40px;
}
.el-menu-item,
.el-submenu {
  margin-left: 20px !important;
}

.is-active {
  font-weight: bold;
}
.main {
  width: 100%;
  /* margin-left: 15%; */
  height: 94%;
}
.user {
  width: 60px;
  height: 40px;
  margin-top: 10px;
  float: right;
}

.imgAvaturl {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
}
.subContent {
  margin-left: 10px;
}
.search {
  margin-left: 30px;
  width: 200px;
  height: 40px;
  margin-top: 10px;
  float: left;
}
.text {
  height: 100%;
  display: flex;
  float: right;
  align-items: center;
  color: gray;
  margin-right: 20px;
  /* margin-right: 10px; */
}
.title {
  height: 100%;
  display: flex;
  align-items: center;
}
.wrapper {
  display: flex;
  justify-content: flex-end;
}
.bai {
  width: 10px;
  height: 10px;
}
</style>