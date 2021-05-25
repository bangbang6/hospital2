<template>
  <div class="inner-wrapper">
    <div class="error-status">
      <div class="content-wrapper">
        <div class="selects">
          <div class="input-wrapper">
            <el-input size="mini" v-model="title" placeholder="文件名" clearable></el-input>
            <el-input size="mini" v-model="uploader" placeholder="发起者" clearable></el-input>
          </div>

          <el-button size="mini" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          size="mini"
          @row-click="handleRowClick"
        >
          <el-table-column prop="title" label="文件" width="100">
            <template slot-scope="scope">
              <span class="over">{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="uploader" label="发起者" width="60"></el-table-column>
          <!-- <el-table-column prop="hospital" label="医院" width="80"></el-table-column> -->
          <el-table-column prop="department" label="科室" width="80"></el-table-column>
          <el-table-column prop="channel" label="部门" width="80"></el-table-column>
          <el-table-column prop="action" label="操作" width="60"></el-table-column>

          <el-table-column prop="date" label="时间">
            <template slot-scope="scope">
              <span>{{formatDate(scope.row.date)}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.type"
                size="mini"
                effect="dark"
                :style="{width:'70px',textAlign:'center'}"
              >{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="paper-detail">
      <errorpaper-detail :paper="paper"></errorpaper-detail>
    </div>
  </div>
</template>
 
<script>
import ErrorpaperDetail from './ErrorpaperDetail'
export default {
  components: { ErrorpaperDetail },
  data () {
    return {
      title: '',
      uploader: '',
      files: [
        {
          id:1,
        title: "病例0X2132",
        uploader: '李医生',
        hospital: '广东人民医院',
        department: '耳鼻喉科',
        channel:'部门A',
        action: '拉取',
        date: new Date(),
        status: '越权操作',
        type: 'danger',
        peer:'peer0.org2.example.com',
        destChannel:'部门C'
      },
      {
        id:2,
        title: "病例0X8219",
        uploader: '王医生',
        hospital: '南京鼓楼医院',
        department: '影像科',
        channel:'部门B',
        action: '查看',
        date: new Date(),
        status: '数据不一致',
        type: 'warning',
        originData:'0xfsahoandassca',
        chainData:'0xwiajhumsufdnf'
      },
      {
        id:3,
        title: "病例0X0123",
        uploader: '张医生',
        hospital: '华西口腔医院',
        department: '影像科',
        channel:'部门B',
        action:'修改',
        date: new Date(),
        status: '多次修改',
        type: 'info',
        updateHistorys:[
          {
            updater: '张医生',
            txId: 'DBsapodk265623sadaxcasa',
            updateDate: new Date()
          },
          {
            updater: '刘医生',
            txId: 'Msaofhoasnas4612asdasad',
            updateDate: '2021/2/6'
          },
          {
            updater: '刘医生',
            txId: 'IDsakfpowe456s51asdw854s',
            updateDate: '2021/2/5'
          },
        ]
      },
      {
        id:4,
        title: "病例0X7632",
        uploader: '陈医生',
        hospital: '吉大第一医院',
        department: '耳鼻喉科',
        channel:'部门B',
        action:'查看',
        date: new Date(),
        status: '数据不一致',
        type: 'warning',
        originData:'0xssawfxwafadw',
        chainData:'0xdwawefzzsrfds'
      },
      {
        id:5,
        title: "病例0X2521",
        uploader: '刘医生',
        hospital: '同济医院',
        department: '信息中心',
        channel:'部门D',
        action:'共享',
        date: new Date(),
        status: '越权操作',
        type: 'danger',
        peer:'peer0.org8.example.com',
        destChannel:'部门G'
      },
      {
        id:6,
        title: "病例0X6321",
        uploader: '杨医生',
        hospital: '齐鲁医院',
        department: '信息中心',
        channel:'部门G',
        action:'共享',
        date: new Date(),
        status: '越权操作',
        type: 'danger',
        peer:'peer0.org14.example.com',
        destChannel:'部门D'
      },

      {
        id:7,
        title: "病例0X6312",
        uploader: '黄医生',
        hospital: '上海第六医院',
        department: '耳鼻喉科',
        channel:'部门E',
        action:'查看',
        date: new Date(),
        status: '数据不一致',
        type: 'warning',
        originData:'0xawrfeaswefee',
        chainData:'0xpawuwenfrusf'
      },
      {
        id:8,
        title: "病例0X5213",
        uploader: '胡医生',
        hospital: '武汉第一医院',
        department: '影像科',
        channel:'部门A',
        action:'修改',
        date: new Date(),
        status: '多次修改',
        type: 'info',
        updateHistorys:[
          {
            updater: '胡医生',
            txId: 'DBsapodk265623sadaxcasa',
            updateDate: new Date()
          },
          {
            updater: '王医生',
            txId: 'Msaofhoasnas4612asdasad',
            updateDate: '2021/4/6'
          },
          {
            updater: '李医生',
            txId: 'IDsakfpowe456s51asdw854s',
            updateDate: '2021/1/5'
          },
        ]

      }
      ],
      tableData: [],
      paper: {},
    }
  },
  methods: {
    handleRowClick (row) {
      let id = row.id

      this.paper = this.files.filter(file => file.id === id)[0]
      console.log('this.paper', this.paper);
    },
    formatDate (date) {
      return date.toLocaleString().slice(0, 9)
    },
    search () {
      this.tableData = this.files
      if (this.title) {

        this.tableData = this.tableData.filter(file => file.title.indexOf(this.title) > -1)
      }
      if (this.author) {
        this.tableData = this.tableData.filter(file => file.uploader.indexOf(this.author) > -1)
      }

    }
  },
  mounted () {
    this.tableData = this.files

    this.title = this.$route.query.title
    this.search()
    this.paper = this.tableData[0]

  }
}
</script>
 
<style lang="scss" scoped>
.inner-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .error-status {
    width: 40%;
    margin-left: 8%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    /* box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%); */

    background: white;
    height: calc(100% - 20px);
    /*  height: 100%; */
    .content-wrapper {
      padding-top: 50px;
      padding-left: 20px;
      .selects {
        display: flex;
        justify-content: space-between;
        .el-input {
          margin-right: 20px;
          width: 120px;
        }
        .el-button {
          margin-right: 10px;
        }
      }
      .el-table {
        margin-top: 20px;
        .over {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .paper-detail {
    width: 40%;
    margin-left: 2%;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    /*   box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%); */

    background: white;
    height: calc(100% - 20px);
    /* height: 100%; */
  }
}
</style>

<style scoped>
.error-status {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.paper-detail {
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>