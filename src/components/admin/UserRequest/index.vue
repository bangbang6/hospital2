<template>
  <div class="request">
    <el-tabs type="border-card" class="tab">
      <el-tab-pane label="未处理请求">
        <el-table :data="tableData1" class="table" size="mini">
          <el-table-column prop="shareUserName" label="分享者" width="160"></el-table-column>
          <el-table-column prop="shareUserChannelName" label="分享者通道" width="160"></el-table-column>
          <el-table-column prop="sharedUserName" label="被分享者" width="160"></el-table-column>
          <el-table-column prop="sharedUserChannelName" label="被分享者通道" width="160"></el-table-column>
          <el-table-column prop="fileName" label="文件名" width="160"></el-table-column>
          <el-table-column prop="channelName" label="文件通道" width="160"></el-table-column>
          <el-table-column prop="modifiedTime" label="文件修改时间" width="160"></el-table-column>
          <el-table-column prop="action" label="操作">
            <template slot-scope="scope">
              <el-checkbox
                v-model="scope.row.checked"
                @change="handleChange(scope.$index)"
                :disabled="groupDisable"
              >同意</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已处理请求">
        <el-table :data="tableData2" class="table" size="mini">
          <el-table-column prop="shareUserName" label="分享者" width="160"></el-table-column>
          <el-table-column prop="shareUserChannelName" label="分享者通道" width="160"></el-table-column>
          <el-table-column prop="sharedUserName" label="被分享者" width="160"></el-table-column>
          <el-table-column prop="sharedUserChannelName" label="被分享者通道" width="160"></el-table-column>
          <el-table-column prop="fileName" label="文件名" width="160"></el-table-column>
          <el-table-column prop="channelName" label="文件通道" width="160"></el-table-column>
          <el-table-column prop="modifiedTime" label="文件修改时间" width="160"></el-table-column>
          <el-table-column prop="action" label="操作">
            <template>
              <el-checkbox :checked="true" disabled>已同意</el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import { getAllRequest, adminConfirmRequest } from '@/api/admin'
export default {
  data () {
    return {
      tableData1: [],
      tableData2: [],
      groupDisable: false
    }
  },
  methods: {
    parser (data) {
      data.forEach(item => {
        if (item.acceptOrNot === 0) {
          this.tableData1.push({
            shareUserName: item.shareUserName,
            shareUserId: item.shareUserId,
            shareUserChannelName: item.shareUserChannelName,
            sharedUserName: item.sharedUserName,
            sharedUserId: item.sharedUserId,
            sharedUserChannelName: item.shareUserChannelName,
            fileName: item.dataSample.dataName.split('/').slice(-1)[0],
            modifiedTime: item.dataSample.modifiedTime.slice(0, 10),
            createdTime: item.dataSample.createdTime.slice(0, 10),
            channelName: 'channel' + item.dataSample.channelId,
            fileId: item.dataSample.id,
            acceptOrNot: item.acceptOrNot,
            checked: false
          })
        } else {
          this.tableData2.push({
            shareUserName: item.shareUserName,
            shareUserId: item.shareUserId,
            sharedUserId: item.sharedUserId,
            shareUserChannelName: item.shareUserChannelName,
            sharedUserName: item.sharedUserName,
            sharedUserChannelName: item.shareUserChannelName,
            fileName: item.dataSample.dataName.split('/').slice(-1)[0],
            modifiedTime: item.dataSample.modifiedTime.slice(0, 10),
            createdTime: item.dataSample.createdTime.slice(0, 10),
            channelName: 'channel' + item.dataSample.channelId,
            fileId: item.dataSample.id,
            acceptOrNot: item.acceptOrNot,
            checked: true

          })
        }

      })
    },
    handleChange (index) {
      console.log(index);
      this.groupDisable = true
      adminConfirmRequest(this.tableData1[index].shareUserId, this.tableData1[index].sharedUserId, this.tableData1[index].fileId).then(res => {
        console.log('confirmres', res);
        if (res.data.code === 200) {
          const changeItem = this.tableData1.splice(index, 1)
          this.tableData2.unshift(changeItem[0])
          console.log('table2', this.tableData2);
          alert(res.data.message)
        } else {
          alert(res.data.message)
        }
        this.groupDisable = false
      })
    }
  },
  mounted () {
    getAllRequest().then(res => {
      console.log('userRequest', res);
      if (res.data.code === 200) {
        this.parser(res.data.data)

      } else {
        alert(res.data.message)
      }
    })
  },
  /*  watch: {
     tableData1: {
       handler (newValue, oldValue) {
         console.log(newValue, oldValue);
       },
       deep: true
     }
   } */
}
</script>
 
<style lang="scss" scoped>
.request {
  width: 86%;
  margin-left: 7%;
  .tab {
    width: 100%;
    margin-top: 20px;
    .table {
      width: 100%;
    }
  }
}
</style>