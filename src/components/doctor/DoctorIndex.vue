<template>
  <div class="doctor">
    <div class="header">
      <div class="content">
        <div class="logo">
          <img src="../../assets/logo.jpg" class="imgLogo" />
        </div>
        <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title">文件列表</template>
              <el-menu-item index="2-1">
                <i class="el-icon-files"></i>
                <span class="subContent">我的文件</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-thumb"></i>
                <span class="subContent">已授权文件</span>
              </el-menu-item>
              <el-menu-item index="2-3">
                <i class="el-icon-document-add"></i>
                <span class="subContent">被授权文件</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="3">上传文件</el-menu-item>
          </el-menu>
        </div>
        <div class="search">
          <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search" v-model="inputValue"></el-input>
        </div>
        <div class="user">
          <div class="avaturl">
            <el-dropdown trigger="click" @command="handleCommand">
              <img src="../../assets/avaturl.jpg" class="imgAvaturl" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-turn-off" command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      inputValue: '',
      paths: ['/doctor/index', '/doctor/myFile', '/doctor/sharedFile', '/doctor/beSharedFile', 'upload']
    };
  },
  methods: {
    handleSelect (key) {
      switch (key) {
        case '1':
          this.$router.push(this.paths[0]);
          break;
        case '2-1':
          this.$router.push(this.paths[1]);
          break;

        case '2-2':
          this.$router.push(this.paths[2]);
          break;
        case '2-3':
          this.$router.push(this.paths[3]);
          break;
        case '3':
          this.$router.push(this.paths[4]);
          break;
      }
    },
    handleCommand (command) {
      if (command === 'loginout') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.doctor {
  width: 100%;
  background-color: rgb(240, 242, 245);
  height: 100%;
}
.header {
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: white;
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
  height: 92%;
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