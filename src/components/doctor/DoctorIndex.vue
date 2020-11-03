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
                <i class="el-icon-upload"></i>
                <span class="subContent">我的文件</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-folder-opened"></i>
                <span class="subContent">授权文件</span>
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
            <img src="../../assets/avaturl.jpg" class="imgAvaturl" />
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
      inputValue: ''
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
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
  height: 600px;
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