<template>
  <div style="background-color: #FFF;">
    <el-tag type="success" style="margin:10px 0px 0px 10px">积分排名</el-tag>
    <el-table :data="list" style="width: 100%;padding-top: 15px;">
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="积分" align="center">
        <template slot-scope="scope">
          {{ scope.row.credits }}
        </template>
      </el-table-column>
      <el-table-column label="医院" align="center">
        <template slot-scope="scope">
          <el-tag>
            {{ scope.row.hospital }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { transactionList } from '@/api/remote-search'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  data() {
    return {
      list: [
        { name: '赵医生', credits: 1000, hospital: '协和医院' },
        { name: '钱医生', credits: 900, hospital: '协和医院' },
        { name: '孙医生', credits: 800, hospital: '协和医院' },
        { name: '李医生', credits: 700, hospital: '协和医院' },
        { name: '周医生', credits: 600, hospital: '协和医院' },
        { name: '武医生', credits: 500, hospital: '协和医院' },
        { name: '郑医生', credits: 400, hospital: '协和医院' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // transactionList().then(response => {
      //   this.list = response.data.items.slice(0, 8)
      // })
    }
  }
}
</script>
