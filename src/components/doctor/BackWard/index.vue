<template>
  <div class="table-wrapper">
    <div class="btns">
      <el-button type="primary" size="mini" @click="back">返回</el-button>
      <div class="text">{{text}}</div>
      <el-button type="primary" size="mini" @click="backagain">单次溯源</el-button>
      <!-- <el-button type="primary" size="mini" @click="backagain">全部溯源</el-button> -->
    </div>
    <el-table :data="tableData" style="width: 100%" class="table" size="mini">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="fileName" label="文件名" width="153"></el-table-column>
      <el-table-column prop="user" label="操作者" width="153"></el-table-column>
      <el-table-column prop="type_tx" label="type_tx" width="153"></el-table-column>
      <el-table-column prop="this_tx_id" label="事务id" width="300" />
      <el-table-column prop="last_tx_id" label="上次事务id"></el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { backward, backwardAgain } from '@/api/file'
import { mapState } from 'vuex'
export default {
  data () {
    return {

      tableData: [],
      txId: 0
    }
  },
  computed: {
    dataId () {
      return localStorage.getItem('dataId')
    },
    text () {
      if (this.tableData.length) return this.tableData[0].fileName + '溯源过程'
      else return ''
    }
  },
  methods: {
    parser (record) {

      return {
        fileName: record.fileName.split('/').slice(-1)[0],
        ...record.record
      }
    },
    back () {
      this.$router.back(-1)
    },
    backagain () {
      if (!this.txId || !this.dataId) {
        return
      }
      backwardAgain(this.dataId, this.txId).then(res => {
        console.log('res', res);
        if (res.data.code === 200) {
          console.log('again', res.data.data);
          this.txId = res.data.data.record.this_tx_id
          this.tableData.unshift(this.parser(res.data.data))
        } else {
          alert(res.data.message)
        }
      }, reject => {
        console.log(reject);
        alert(reject.message)
      })
    }
  },
  mounted () {

    backward(this.dataId).then(res => {
      if (res.data.code === 200) {
        console.log(res.data.data);
        this.txId = res.data.data.record.this_tx_id
        this.tableData.push(this.parser(res.data.data))
      } else {
        alert(res.data.message)
      }
    })
  }
}
</script>
 
<style lang="scss" scoped>
.table-wrapper {
  margin-top: 40px;
  background: white;
  .btns {
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
}
</style>