<template>
  <div
    style="width: 100%;margin: auto;background-color: #f0f2f5;padding-top:50px;position:relative"
    class="content"
  >
    <div
      class="el-table el-table--fit el-table--fluid-height el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin: auto;padding: 20px 20px;background-color: #f0f2f5"
    >
      <el-button icon="el-icon-download" type="primary">下载</el-button>
      <el-button icon="el-icon-share" type="primary">分享</el-button>
      <el-button icon="el-icon-circle-close" type="danger">删除</el-button>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="display: inline-block;float: right"
      >
        <el-date-picker
          v-model="selectTime"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
        <el-autocomplete
          class="input-with-select"
          v-model="input"
          :fetch-suggestions="querySearch"
          placeholder="请输入您要查找的文件名"
          @select="handleSelect"
        >
          <el-select placeholder="文件类型" v-model="select" slot="prepend">
            <el-option label="jpg文件" value=".jpg"></el-option>
            <el-option label="doc文件" value=".doc"></el-option>
          </el-select>

          <el-button slot="append" icon="el-icon-search" @click="onSubmit()"></el-button>
        </el-autocomplete>
      </el-form>
      <el-tabs type="border-card" @tab-click="handleTabclick">
        <el-tab-pane v-for="(item,tabIndex) in channels" :key="item.id" :label="item.name">
          <el-table
            ref="multipleTable"
            :data="tableData[tabIndex].slice((currentPage[tabIndex]-1)*pagesize,currentPage[tabIndex]*pagesize)"
            tooltip-effect="dark"
            style="height: 450px;"
            @selection-change="handleSelectionChange"
            v-loading="loading1"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column
              prop="fileName"
              label="文件名"
              style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
            ></el-table-column>
            <el-table-column
              prop="channelName"
              label="文件所在通道"
              style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
            ></el-table-column>
            <el-table-column
              prop="action"
              label="..."
              style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
              width="200px"
            >
              <template slot-scope="scope">
                <div class="action">
                  <el-tooltip
                    v-for="item  in scope.row.authoritySet"
                    :key="item.id"
                    class="item"
                    effect="light"
                    placement="bottom-start"
                    style="margin-right: 5px"
                    :content="item.content"
                  >
                    <el-link
                      :icon="item.icon"
                      style="font-size: 18px;color: #409EFF"
                      @click="handleClick(tabIndex,scope.$index,item.id)"
                    ></el-link>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fileSize"
              label="文件大小"
              style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
              :sortable="true"
              :sort-method="sortBySize"
              width="120px"
            ></el-table-column>
            <el-table-column
              prop="upload_data"
              label="上传日期"
              :sortable="true"
              :sort-method="sortByUploadDate"
              style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
              width="150px"
            ></el-table-column>
            <el-table-column
              prop="modifiedData"
              label="更改日期"
              :sortable="true"
              :sort-method="sortByModDate"
              style="box-sizing: border-box;text-overflow: ellipsis;vertical-align: middle;position: relative;text-align: left;"
              width="150px"
            ></el-table-column>
          </el-table>
          <el-pagination
            class="fy"
            layout="prev, pager, next"
            @current-change="current_change"
            :total="total"
            background
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      class="result"
      v-if="res"
      v-loading="loading2"
      style="position:absolute;width:100%;height:90%;z-index:999;top:50px;background:white;padding:20px"
    >
      <div class="header" style="font-size:22px">{{seeFileName}}</div>
      <textarea
        name="result"
        id="fileMessage"
        v-model="fileMessage"
        :readonly="!seeStatus"
        style="width:100%;height:80%;display:inline-block;border:none;font-size:16px;margin-top:20px;outline: none"
      ></textarea>
      <div class="footer" style="display:flex;justify-content:flex-end">
        <el-button type="primary" plain @click="goBack">返回</el-button>
        <el-button type="primary" @click="submitChangeFile" v-if="seeStatus">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFileList } from '@/api/file'
import { deleteFile, getFile, updateFile, backward } from '@/api/file'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      tabIndex: 0,
      channels: [],
      loading2: false,
      loading1: false,
      input: '',
      seeStatus: false,
      select: '',
      fileName: '',
      res: false,
      fileMessage: '',
      total: 200,//默认数据总数
      pagesize: 7,//每页的数据条数
      currentPage: [1, 1],//默认开始页面
      idx: 0,
      formInline: {
        user: '',
        region: ''
      },
      tableData: [],
      multipleSelection: [],
      files: [],
      results: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      selectTime: ''
    }
  },
  computed: {
    seeFileName () {
      return (this.files[this.idx].fileName)
    }
  },
  methods: {
    //切换tab
    handleTabclick (e) {
      this.tabIndex = +e.index
    },
    handleClick (tabIndex, index, authorId) {


      if (authorId === 1) {
        this.loading1 = true;
        this.seeFile(tabIndex, index)
      } else if (authorId === 2) {
        this.loading1 = true;
        this.changeFile(tabIndex, index)
      } else if (authorId === 3) {
        this.loading1 = true;
        this.deleteRow(tabIndex, index)
      } else if (authorId === 4) {
        this.backwordFile(tabIndex, index)
      }
    },
    parserSet (set) {
      set.push(4)
      const contents = ['预览', '修改', '删除', '溯源', '追踪']
      const icons = ['view', 'edit', 'circle-close', 'attract', 'download']
      return set.map((item) => ({
        id: item,
        content: contents[item - 1],
        icon: `el-icon-${icons[item - 1]}`
      }))
    },
    goBack () {
      this.res = false
    },
    submitChangeFile () {
      this.loading2 = true
      updateFile(this.fileMessage, this.files[this.tabIndex][this.idx].id).then(res => {
        if (res.data.code === 200) {
          this.loading2 = false
          alert(res.data.message)
        } else {
          this.loading2 = false
          alert(res.data.message)

        }
        this.res = false
      })
    },
    getOriginal (index) {
      this.$alert('这是第' + index + '行文件溯源结果', '文件溯源', {
        confirmButtonText: '确定'
      })
    },
    downloadFile (index) {
      this.$alert('这是第' + index + '行文件的下载结果', '文件下载', {
        confirmButtonText: '确定'
      })
    },
    changeFile (tabIndex, index) {
      this.idx = this.pagesize * (this.currentPage[this.tabIndex] - 1) + index
      getFile(this.files[tabIndex][this.idx].id).then(res => {
        if (res.data.code === 200) {
          this.res = true
          this.seeStatus = true
          this.fileMessage = res.data.data
          this.loading1 = false
        } else {
          alert(res.data.message)
          this.loading1 = false

        }
      })
    },
    backwordFile (tabIndex, index) {
      this.idx = this.pagesize * (this.currentPage[this.tabIndex] - 1) + index
      this.setDataId(this.files[tabIndex][this.idx].id)
      localStorage.setItem('dataId', this.files[tabIndex][this.idx].id)
      /* backward(this.files[this.idx].id).then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data);
        } else {
          alert(res.data.message)
        }
      }) */
      this.$router.push('/doctor/backward')
    },
    seeFile (tabIndex, index) {
      this.idx = this.pagesize * (this.currentPage[this.tabIndex] - 1) + index

      getFile(this.files[tabIndex][this.idx].id).then(res => {
        if (res.data.code === 200) {
          this.res = true
          this.seeStatus = false
          this.fileMessage = res.data.data
          this.loading1 = false
        } else {
          alert(res.data.message)
          this.loading1 = false

        }
      }, err => {
        alert(err.message)
        this.loading1 = false

      })
    },
    deleteRow (index) {
      let idx = this.pagesize * (this.currentPage[this.tabIndex] - 1) + index
      deleteFile(this.files[tabIndex][idx].id).then(res => {
        if (res.data.code === 200) {
          this.$alert(`${this.files[idx].fileName}文件已被删除`, '文件删除', {
            confirmButtonText: '确定',

          })

          this.files.splice(idx, 1)
          this.loading1 = false

        } else {
          this.$alert(`删除文件失败`, '文件删除', {
            confirmButtonText: '确定',

          })
          this.loading1 = false
        }
      })

    },
    current_change: function (currentPage) {
      this.currentPage.splice(this.tabIndex, 1, currentPage)
      console.log('this.currentPage', this.currentPage);
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    querySearch (queryString, cb) {
      let files = this.files;
      let results = queryString ? files.filter(this.createFilter(queryString)) : files;
      // 调用 callback 返回建议列表的数据
      this.results = results;
      cb(results);
    },
    createFilter (queryString) {
      return (file) => {
        return (file.fileName.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
      };
    },
    createFilterAndTypeAndDate (queryString, Type, DateArr) {
      return (file) => {
        if (!DateArr) {
          return (file.fileName.toLowerCase().indexOf(queryString.toLowerCase()) != -1 && file.fileName.toLowerCase().indexOf(Type.toLowerCase()) != -1);
        }
        let date = file.modifiedData.replace(/-/g, '/')
        let dd = new Date(date).getTime();
        return (file.fileName.toLowerCase().indexOf(queryString.toLowerCase()) != -1 && file.fileName.toLowerCase().indexOf(Type.toLowerCase()) != -1 && dd >= DateArr[0].getTime() && dd <= DateArr[1].getTime());
      };
    },

    handleSelect (item) {
      console.log(item);
    },
    onSubmit () {
      this.currentPage[this.tabIndex] = 1;
      let files = this.files;
      let queryString = this.input;
      let Type = this.select;
      let DateArr = this.selectTime
      this.tableData = files.filter(this.createFilterAndTypeAndDate(queryString, Type, DateArr));
    },
    trans (obj) {//做文件大小转换
      obj = String(obj);
      let num = 0;
      if (obj.substr(obj.length - 1, 1) === 'G') {
        num = obj.substring(0, obj.length - 1) * 1 * 1024 * 1024 * 1024
      } else if (obj.substr(obj.length - 1, 1) === 'M') {
        num = obj.substring(0, obj.length - 1) * 1 * 1024 * 1024
      } else if (obj.substr(obj.length - 1, 1) === 'K') {
        num = obj.substring(0, obj.length - 1) * 1 * 1024
      } else {
        num = obj.substring(0, obj.length - 1) * 1
      }
      return num;
    },
    //根据文件大小排序
    sortBySize (obj1, obj2) {//统一换算为b
      let num1 = this.trans(obj1.fileSize);
      let num2 = this.trans(obj2.fileSize);
      return num1 - num2;
    },
    //根据更新时间排序
    sortByUploadDate (obj1, obj2) {
      let date1 = obj1.upload_data.split("-");
      let date2 = obj2.upload_data.split("-");
      if (parseInt(date1[1]) > parseInt(date2[1])) {//先按照月份比较
        return 1;
      } else if (parseInt(date1[1]) < parseInt(date2[1])) {
        return -1;
      } else {
        if (parseInt(date1[2]) > parseInt(date2[2])) {//再按照日期比较
          return 1;
        } else if (parseInt(date1[2]) < parseInt(date2[2])) {
          return -1;
        }
      }
      return 0;
    },
    //根据更改时间排序
    sortByModDate (obj1, obj2) {
      let date1 = obj1.modifiedData.split("-");
      let date2 = obj2.modifiedData.split("-");
      if (parseInt(date1[1]) > parseInt(date2[1])) {//先按照月份比较
        return 1;
      } else if (parseInt(date1[1]) < parseInt(date2[1])) {
        return -1;
      } else {
        if (parseInt(date1[2]) > parseInt(date2[2])) {//再按照日期比较
          return 1;
        } else if (parseInt(date1[2]) < parseInt(date2[2])) {
          return -1;
        }
      }
      return 0;
    },
    ...mapMutations(['setDataId'])
  },
  mounted () {
    getFileList().then(res => {
      if (res.data.code === 200) {
        console.log('allFile', res.data.data);
        for (let key in res.data.data) {
          let id = (key.match(/id=([0-9]){1,2}/))[1]
          let name = (key.match(/channelName=(\w+)\)/))[1]
          this.channels.push({ id, name })
          let fileData = (res.data.data)[key]
          this.files.push(fileData.map(file => {
            return {
              fileName: (file.dataSample.dataName.split('/').slice(-1))[0],
              fileSize: `${file.dataSample.dataSize}B`,
              upload_data: file.dataSample.createdTime.slice(0, 10),
              modifiedData: file.dataSample.modifiedTime.slice(0, 10),
              id: file.dataSample.id,
              authoritySet: this.parserSet(file.authoritySet),
              channelName: file.channelName
            }
          }))
          this.tableData = this.files
        }


      } else {
        alert(res.data.message)
      }
      console.log(this.channels);
    })

  }
}
</script>
<style  scoped>
.el-table--enable-row-hover .el-table__body tr:hover td:nth-child(3) div div {
  visibility: visible;
}

.fy {
  width: 400px;
  position: absolute;
  top: 88%;
  left: calc(50% - 200px);
}
.el-table--enable-row-hover .el-table__body tr td:nth-child(3) div div {
  visibility: hidden;
}
.el-select .el-input {
  width: 120px;
}
.el-table th > .cell {
  padding-left: 14px;
}
.el-tabs {
  margin-top: 20px;
}
</style>
<style lang="scss" scoped>
</style>