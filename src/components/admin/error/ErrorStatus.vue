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
          <el-table-column prop="hospital" label="医院" width="80"></el-table-column>
          <el-table-column prop="channel" label="通道" width="80"></el-table-column>
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
          title: 'Trustzone-based secure lightweight wallet for hyperlerdger fabric',
          hospital: '同济医院',
          uploader: '代老师',
          id: 1,
          date: new Date(),
          channel: 'channel1',
          action: 'pull',
          status: '权限不足',
          type: 'danger'
        },
        {
          title: 'Trustzone-based secure lightweight wallet for hyperlerdger fabric',
          hospital: '同济医院',

          channel: 'channel1',
          action: 'pull',
          status: '权限不足',
          uploader: 'bang',
          id: 2,
          type: 'danger',

          date: new Date()
        },
        {
          title: 'Foridar',
          hospital: '同济医院',

          action: 'pull',
          status: '数据不一致',
          channel: 'channel1',
          uploader: 'user1',
          id: 3,
          type: 'warning',
          date: new Date()
        },
        {
          title: 'Foridar',
          hospital: '市三医院',
          action: 'pull',
          status: '多次修改',
          channel: 'channel2',
          uploader: 'chen',
          id: 4,
          type: 'info',
          date: new Date()
        },
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