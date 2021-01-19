<template>
  <div class="tab-file">
    <el-tabs type="border-card" class="table-wrapper">
      <el-tab-pane v-for="item in channels" :key="item.id" :label="item.name">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
                    @click="handleClick(scope.$index,item.id)"
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
</template>
 
<script>
import { getFileList } from '@/api/file'

export default {
  data () {
    return {
      channels: []
    }
  },
  mounted () {
    getFileList().then(res => {
      if (res.data.code === 200) {
        console.log('allFile', res.data.data);
        for (let key in res.data.data) {
          let id = (key.match(/id=([0-9]){1,2}/))[1]
          let name = (key.match(/channelName=(\w+)\)/))[1]
          this.channels.push({ id, name })
        }
        /* this.files = res.data.data.map(file => {
          return {
            fileName: (file.dataSample.dataName.split('/').slice(-1))[0],
            fileSize: `${file.dataSample.dataSize}B`,
            upload_data: file.dataSample.createdTime.slice(0, 10),
            modifiedData: file.dataSample.modifiedTime.slice(0, 10),
            id: file.dataSample.id,
            authoritySet: this.parserSet(file.authoritySet),
            channelName: file.channelName
          }
        })
        this.tableData = this.files */
      } else {
        alert(res.data.message)
      }
    })

  }
}
</script>
 
<style lang="scss" scoped>
.tab-file {
  width: 100%;
  margin-top: 20px;
  .table-wrapper {
    width: 100%;
  }
}
</style>