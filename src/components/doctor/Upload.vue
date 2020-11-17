<!--
 * @Author: your name
 * @Date: 2020-10-26 17:06:20
 * @LastEditTime: 2020-10-28 19:09:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hospitalPlatform-master/src/components/doctor/Upload.vue
-->
<template>
  <div class="upload">
    <el-table
      ref="multipleTable"
      :data="uploadFiles"
      tooltip-effect="dark"
      style="width: 100%;height:570px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" width="480">
        <template slot-scope="scope">
          <div class="name">
            <span style="display:inline-block">{{ scope.row.name }}</span>
            <el-progress
              :percentage="scope.row.percentage"
              :color="customColor"
              :show-text="false"
              v-if="scope.row.percentage !==0 && scope.row.percentage !==100"
            ></el-progress>
            <!-- <el-progress :percentage="10" :color="customColor" :show-text="false"></el-progress> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="uploadStatus" label="状态" width="150">
        <template slot-scope="scope">
          <i :class="scope.row.statusIcon"></i>
          <span style="margin-left: 10px">{{ scope.row.uploadStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" width="150"></el-table-column>
      <el-table-column prop="mtime" label="更新时间" width="150"></el-table-column>
      <el-table-column prop="option" label="操作" width="150">
        <template slot-scope="scope">
          <i
            :class="scope.row.optionsIcon"
            @click="handleClick(scope.row.status,scope.$index)"
            :title="scope.row.option"
          ></i>
          <i class="el-icon-view" title="预览" style="margin-left:10px"></i>

          <!--  <span style="margin-left: 10px">{{ scope.row.option }}</span> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      class="pagenation"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => {
    return {
      uploadFiles: [],
      totalFiles: [],
      page: 1,

      customColor: '#409eff'
    }

  },
  async mounted () {
    let uploadFiles = await axios.get("http://localhost:3000/")

    this.totalFiles = this.orderByTime(this.parseFiles(uploadFiles.data))
    this.uploadFiles = this.totalFiles.slice(0, 15)
  },
  methods: {
    handleSelectionChange () {

    },


    getStatus (status) {
      return status === 0 ?
        '未上传'
        : status === 1 ?
          '已上传' : '上传失败'
    },
    getOption (status) {
      if (status === 0) {
        return '上传'
      } else if (status === 1) {
        return '取消'
      } else {
        return '重新上传'
      }
    },
    calcSize (size) {
      return (size / (1024)).toFixed(2) + 'K'
    },
    getStatusIcon (status) {
      if (status === 0) {
        return 'el-icon-time'
      } else if (status === 1) {
        return 'el-icon-circle-check green'
      } else {
        return 'el-icon-warning-outline red'
      }
    },
    getOptionIcon (status) {
      if (status == 0) {
        return 'el-icon-upload'
      } else if (status == 1) {
        return 'el-icon-remove-outline'
      } else {
        return 'el-icon-upload'
      }
    },
    parseFiles (files) {
      return files.map(file => {
        return {
          name: file.name,
          status: file.status,
          size: this.calcSize(file.size),
          mtime: file.mtime.slice(0, 10),
          uploadStatus: this.getStatus(file.status),
          percentage: 0,
          option: this.getOption(file.status),
          statusIcon: this.getStatusIcon(file.status),
          optionsIcon: this.getOptionIcon(file.status),
        }
      })
    },

    orderByTime (files) {

      files.sort((file1, file2) => {

        if (file2.mtime > file1.mtime) {
          return 1
        } else {
          return -1
        }
      })
      return files
    },
    orderByStatus (files, index) {
      let changeFile = files[(this.page - 1) * 15 + index]
      files.splice((this.page - 1) * 15 + index, 1)
      files.unshift(changeFile)
      return files
    },
    changeFileProps (file, index) {
      this.totalFiles[(this.page - 1) * 15 + index] = {

        name: file.name,
        status: file.status,
        size: file.size,
        percentage: file.percentage,
        mtime: file.mtime.slice(0, 10),
        uploadStatus: this.getStatus(file.status),
        option: this.getOption(file.status),
        statusIcon: this.getStatusIcon(file.status),
        optionsIcon: this.getOptionIcon(file.status),

      }

    },
    handleClick (status, index) {
      if (status === 0) {
        //上传
        //this.uploadFiles[index].status = 1
        let timer = setInterval(() => {
          this.totalFiles[(this.page - 1) * 15 + index].percentage = this.totalFiles[(this.page - 1) * 15 + index].percentage + 20
          if (this.totalFiles[(this.page - 1) * 15 + index].percentage == 100) {
            this.totalFiles[(this.page - 1) * 15 + index].status = 1

            let file = this.totalFiles[(this.page - 1) * 15 + index]
            this.changeFileProps(file, index)
            this.totalFiles = this.orderByStatus(this.totalFiles, index)

            this.uploadFiles = this.totalFiles.slice((this.page - 1) * 15, this.page * 15)
            clearInterval(timer)

          }
        }, 1000);


      } else if (status === 1) {
        //删除
        //this.uploadFiles[index].status = 0
        this.totalFiles[(this.page - 1) * 15 + index].status = 0
        this.totalFiles[(this.page - 1) * 15 + index].percentage = 0
        let file = this.totalFiles[(this.page - 1) * 15 + index]

        this.changeFileProps(file, index)
        this.uploadFiles = this.totalFiles.slice((this.page - 1) * 15, this.page * 15)

      } else {
        //重新上传
        let timer = setInterval(() => {
          this.totalFiles[(this.page - 1) * 15 + index].percentage = this.totalFiles[(this.page - 1) * 15 + index].percentage + 20
          if (this.totalFiles[(this.page - 1) * 15 + index].percentage == 100) {
            this.totalFiles[(this.page - 1) * 15 + index].status = 1
            let file = this.totalFiles[(this.page - 1) * 15 + index]
            this.changeFileProps(file, index)
            this.totalFiles = this.orderByStatus(this.totalFiles, index)

            this.uploadFiles = this.totalFiles.slice((this.page - 1) * 15, this.page * 15)
            clearInterval(timer)

          }
        }, 1000);

      }


    },
    handleCurrentChange (val) {
      this.page = val
      this.uploadFiles = this.totalFiles.slice((val - 1) * 15, val * 15)
    }
  }
}
</script>
<style lang='scss' scoped>
.upload {
  height: 90%;
  margin-top: 2%;
  width: 100%;
  background-color: white;
}

.green {
  color: green;
}
.red {
  color: red;
}
.upload .pagenation {
  width: 400px;
  margin-left: calc(50% - 200px);
  margin-top: 10px;
}
.name {
  display: flex;
  justify-content: space-between;
}
.el-progress {
  width: 100px;
  margin-top: 10px;
}
</style>
