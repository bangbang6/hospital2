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
                <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-pie-chart" command="jumpToshouye">首页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-folder-opened" command="jumpToFile">文件列表</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-turn-off" command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <file-list></file-list>
    </div>
  </div>
</template>

<script>
import DashBoard from './DashBoard.vue';
import FileList from './FileList.vue';
export default {
  components: { DashBoard, FileList },
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
      if (command === 'loginout') {
        this.$router.push('/')
      }
      if (command === 'jumpToshouye') {
        this.$router.push('/admin')
      }
      if (command === 'jumpToFile') {
        this.$router.push('/admin/fileList')
      }
    },

  }
}
</script>

<style scoped>
.admin {
  width: 100%;
  height: 100%;
  background-color: rgb(240, 242, 245);
}
.header {
  width: 100%;
  height: 7%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  /*  background-color: white; */
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
  width: 70%;
  margin-left: 15%;
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