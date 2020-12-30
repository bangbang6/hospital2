<template>
  <div style="width: 100%;margin: auto;background-color: #f0f2f5;padding-top:50px">
    <div
      class="el-table el-table--fit el-table--fluid-height el-table--enable-row-hover el-table--enable-row-transition"
      style="width: 100%;margin: auto;padding: 20px 20px"
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
      <el-table
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="height: 450px;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="fileName"
          label="文件名"
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
                class="item"
                effect="light"
                content="溯源"
                placement="bottom-start"
                style="margin-right: 5px"
              >
                <el-link
                  icon="el-icon-attract"
                  style="font-size: 18px;color: #409EFF"
                  @click="getOriginal(scope.$index)"
                ></el-link>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="预览"
                placement="bottom-start"
                style="margin-right: 5px"
              >
                <el-link
                  icon="el-icon-view"
                  style="font-size: 18px;color: #409EFF"
                  @click="seeFile(scope.$index)"
                ></el-link>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="下载"
                placement="bottom-start"
                style="margin-right: 5px"
              >
                <el-link
                  icon="el-icon-download"
                  style="font-size: 18px;color: #409EFF"
                  @click="downloadFile(scope.$index)"
                ></el-link>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="分享"
                placement="bottom-start"
                style="margin-right: 5px"
              >
                <el-link
                  icon="el-icon-share"
                  style="font-size: 18px;color: #409EFF"
                  @click="shareFile(scope.$index)"
                ></el-link>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="light"
                content="删除"
                placement="bottom-start"
                style="margin-right: 5px"
              >
                <el-link
                  icon="el-icon-circle-close"
                  style="font-size: 18px;color: #409EFF"
                  @click="deleteRow(scope.$index)"
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
    </div>
  </div>
</template>

<script>
import { getFileList } from '@/api/file'
import { deleteFile } from '@/api/file'
export default {
  data () {
    return {
      input: '',
      select: '',
      total: 200,//默认数据总数
      pagesize: 7,//每页的数据条数
      currentPage: 1,//默认开始页面
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

  methods: {
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
    shareFile (index) {
      this.$alert('这是第' + index + '行文件的分享结果', '文件分享', {
        confirmButtonText: '确定'
      })
    },
    seeFile (index) {
      this.$alert('这是第' + index + '行文件的预览结果', '文件预览', {
        confirmButtonText: '确定'
      })
    },
    deleteRow (index) {
      console.log('index', index);
      let idx = this.pagesize * (this.currentPage - 1) + index
      deleteFile(this.files[idx].id).then(res => {
        console.log('delete', res);
        if (res.data.code === 200) {
          this.$alert(`${this.files[idx].fileName}文件已被删除`, '文件删除', {
            confirmButtonText: '确定',

          })
          getFileList().then(res => {
            console.log('files', res);
            if (res.data.code === 200) {
              this.files = res.data.data.map(file => {
                return {
                  fileName: (file.dataName.split('/').slice(-1))[0],
                  fileSize: `${file.dataSize}k`,
                  upload_data: file.createdTime.slice(0, 10),
                  modifiedData: file.modifiedTime.slice(0, 10),
                  id: file.id
                }
              })
              this.tableData = this.files
            }
          })


        } else {
          this.$alert(`删除文件失败`, '文件删除', {
            confirmButtonText: '确定',

          })
        }
      })

    },
    current_change: function (currentPage) {
      this.currentPage = currentPage;
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
        //console.log(date)
        let dd = new Date(date).getTime();
        return (file.fileName.toLowerCase().indexOf(queryString.toLowerCase()) != -1 && file.fileName.toLowerCase().indexOf(Type.toLowerCase()) != -1 && dd >= DateArr[0].getTime() && dd <= DateArr[1].getTime());
      };
    },

    handleSelect (item) {
      console.log(item);
    },
    onSubmit () {
      this.currentPage = 1;
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
    }
  },
  mounted () {
    getFileList().then(res => {
      console.log('files', res);
      if (res.data.code === 200) {
        this.files = res.data.data.map(file => {
          return {
            fileName: (file.dataName.split('/').slice(-1))[0],
            fileSize: `${file.dataSize}k`,
            upload_data: file.createdTime.slice(0, 10),
            modifiedData: file.modifiedTime.slice(0, 10),
            id: file.id
          }
        })
        this.tableData = this.files
      }
    })

  }
}
</script>
<style>
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
</style>