<template>
  <div class="admin">
    <div class="header">
      <div class="content">
        <!-- <div class="logo">
          <img src="../../assets/logo.jpg" class="imgLogo" />
        </div>
        <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="0">首页</el-menu-item>

            <el-menu-item index="1">文件列表</el-menu-item>
          </el-menu>-
        </div>
        <div class="search">
          <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search" v-model="inputValue"></el-input>
        </div>-->
        <div class="user">
          <div class="avaturl">
            <el-dropdown trigger="click" @command="handleCommand">
              <img src="../../assets/avaturl.jpg" class="imgAvaturl" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-pie-chart" command="jumpToshouye">首页</el-dropdown-item>

                <el-dropdown-item icon="el-icon-user" command="jumpToYunei">域内设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-folder-opened" command="jumpToYujian">域间设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-turn-off" command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <!--  <router-view></router-view> -->
      <dash-board></dash-board>
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
      paths: ['/admin/index', '/admin/fileList']
    };
  },
  methods: {
    handleSelect (key) {
      let num = parseInt(key)
      this.$router.push(this.paths[num])
    },
    handleCommand (command) {

      if (command === 'jumpToshouye') {
        this.$router.push('/admin')
      }
      if (command === 'jumpToRequest') {
        this.$router.push('/admin/userRequest')
      }
      if (command === 'jumpToAuth') {
        this.$router.push('/admin/authorize')
      }
      if (command === 'jumpToChannel') {
        this.$router.push('/admin/channel')
      }
      if (command === 'jumpToYunei') {
        this.$router.push('/admin/yunei')
      }
      if (command === 'loginout') {
        removeToken('token')
        localStorage.removeItem('userChannel')
        localStorage.removeItem('userName')
        this.$router.push('/')
      }
      if (command === 'jumpToYujian') {

        this.$router.push('/admin/yujian')
      }
    },

  }
}
</script>

<style scoped>
.admin {
  width: 100%;
  background-color: rgb(48, 48, 48);
  height: 100%;
}
.header {
  width: 100%;
  height: 6%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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
</style>