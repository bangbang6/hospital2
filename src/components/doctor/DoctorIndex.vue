<template>
  <div class="doctor">
    <div class="header">
      <div class="content">
        <!-- <div class="logo">
          <img src="../../assets/logo.jpg" class="imgLogo" />
        </div>-->
        <div class="menu">
          <!-- <el-menu
            :default-active="activeIndex"
            class="el-menu"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="0">
              <span class="subContent">我的文件</span>
            </el-menu-item>
            <el-menu-item index="1">
              <span class="subContent">所有文件</span>
            </el-menu-item>

            <el-menu-item index="2">上传文件</el-menu-item>
          </el-menu>-->
          <div :style="{fontWeight:'bold'}">联合计算中心-数据分节点</div>
        </div>
        <!--  <div class="search">
          <el-input placeholder="请输入搜索内容" suffix-icon="el-icon-search" v-model="inputValue"></el-input>
        </div>-->

        <div class="user">
          <div class="channelName">
            <el-button type="primary" size="mini">贡献度:4539分</el-button>
            <el-button type="primary" size="mini">个人中心</el-button>

            <!-- /{{userChannel}} -->
          </div>
          <!-- <div class="avaturl">
            <el-dropdown trigger="click" @command="handleCommand">
              <img src="../../assets/avaturl.jpg" class="imgAvaturl" />
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-turn-off" command="loginout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>-->
        </div>
      </div>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { removeToken } from '@/utils/cookie'
export default {
  data () {
    return {
      activeIndex: '0',

      inputValue: '',
      paths: ['/doctor/myFile', '/doctor/allFile', '/doctor/simpleUpload']
    };
  },
  computed: {
    userChannel () {
      return localStorage.getItem('userHospital') || '无单位'
    },
    userName () {
      return localStorage.getItem('userName') || ''
    },
  },
  methods: {
    handleSelect (key) {
      switch (key) {
        case '0':
          this.$router.push(this.paths[0]);
          break;
        case '1':
          this.$router.push(this.paths[1]);
          break;

        case '2':
          this.$router.push(this.paths[2]);
          break;

      }
    },
    handleCommand (command) {
      if (command === 'loginout') {
        removeToken('userToken')
        localStorage.removeItem('userHospital')
        localStorage.removeItem('userName')
        this.$router.push('/')
      }
    }
  },
  watch: {
    $route: {
      handler (newV) {
        console.log('newV', newV);
        if (newV.name === 'myFile') {
          this.activeIndex = '0'
        }
        else if (newV.name === 'allFile' || newV.name === 'sgx') {
          this.activeIndex = '1'
        }
        else if (newV.name === 'simpleUpload') {
          this.activeIndex = '2'
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang='scss'>
.doctor {
  width: 100%;
  background-color: rgb(240, 242, 245);
  height: 100%;
}
.header {
  width: 100%;
  height: 40px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background-color: white;
}

.el-menu {
  border-bottom: solid 0 white !important;
}
.content {
  margin-left: 15%;
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.channelName {
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: gray;
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
  width: 300px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.avaturl {
  margin-left: 10px;
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
<style lang="scss" >
.search {
  .el-input__icon {
    line-height: 100%;
  }
}
</style>