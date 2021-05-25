<template>
  <div class="table-wrapper">
    <div class="btns">
      <el-button type="primary" size="mini" @click="back">返回</el-button>
      <div class="text">{{text}}</div>
      <div class="btns-wrapper">
        <el-button type="primary" size="mini" @click="backAll">全部溯源</el-button>
        <el-button type="primary" size="mini" @click="backagain">单次溯源</el-button>
      </div>
    </div>
    <div id="container"></div>
  </div>
</template>
 
<script>
import { backward, backwardAgain, traceBackwardForAll } from '@/api/file'
import { mapState } from 'vuex'
import { Graph } from '@antv/x6';
import { Shape } from '@antv/x6'
export default {
  data () {
    return {
      tableData: [],
      txId: 0,
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
    renderGraph () {
      const index = this.tableData.length
      const { user, dst_chain, src_chain, type_tx, fileName, this_tx_id } = this.tableData[0]
      let loop = Math.floor((index - 1) / 4)
      const rect = new Shape.Rect({
        id: `node${index - 1}`,
        x: 40 + loop * 450,
        y: loop % 2 === 0 ? 40 + (index - 1) % 4 * 100 : 40 + (3 - ((index - 1) % 4)) * 100,
        width: 400,
        height: 40,
        label: `${user}   ${type_tx}   ${fileName}(${src_chain})    交易号(${this_tx_id.slice(-10)}) `,
        zIndex: 2,
        attrs: {
          label: {
            fontSize: '12px'
          }
        }
      })
      const edge = new Shape.Edge({
        id: `edge${index - 1}`,
        source: `node${index - 2}`,
        target: `node${index -1}`,
        zIndex: 1,
      })
      this.graph.addNode(rect)
      this.graph.addEdge(edge)
    },
    initGragh () {
      this.graph = new Graph({
        container: document.getElementById('container'),
        scroller: {
          enabled: true,
          className: 'my-scroller'
        },
      });
      const { user, dst_chain, src_chain, type_tx, fileName, this_tx_id } = this.tableData[0]
      const rect = new Shape.Rect({
        id: `node0`,
        x: 40,
        y: 40,
        width: 400,
        height: 40,
        label: `${user}   ${type_tx}   ${fileName}(${src_chain})   交易号(${this_tx_id.slice(-10)}) `,
        zIndex: 2,
        attrs: {
          label: {
            fontSize: '12px'
          }
        }
      })
      this.graph.addNode(rect)
    },
    backAll () {
      traceBackwardForAll(this.dataId).then(res =>{
        if (res.data.code === 200) {
          console.log(res.data.data);
          // this.txId = res.data.data.record.this_tx_id
          let records = res.data.data
          console.log(records)
          
          for(var i = this.tableData.length;i < records.length;i++){
            this.tableData.unshift(this.parser(records[i]))
            
              this.renderGraph()
            
          }
          // records = records.map(record =>{
          //    this.tableData.unshift(this.parser(record))
          // })
          // console.log(records)
          // this.tableData = records
          // console.log(this.tableData)
          // // this.tableData.push(this.parser(res.data.data))
          // this.initGragh()
        } else {
          alert(res.data.message)
        }
     })
      //todo 全部溯源
    },
    parser (record) {
      // return {
      //   fileName: record.fileName.split('/').slice(-1)[0],
      //   ...record.record
      // }
      let userMap = new Map();
      userMap.set("org2_user", "李医生")
      userMap.set("org3_user", "王医生")
      userMap.set("org4_user", "张医生")
      userMap.set("org5_user", "陈医生")
      let opMap = new Map();
      opMap.set("add", "添加")
      opMap.set("read", "查看")
      opMap.set("modify", "修改")
      opMap.set("download", "下载")
      opMap.set("push", "共享")
      opMap.set("pull", "拉取")
      return {
        fileName: record.fileName.split('/').slice(-1)[0],
        user: userMap.get(record.record.user),
        type_tx: opMap.get(record.record.type_tx),
        src_chain: record.record.src_chain === "channel1" ? "部门A" : "部门B",
        this_tx_id: record.record.this_tx_id
        // ...record.record
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
          this.renderGraph()
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
        this.initGragh()
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
  height: 600px;
  .btns {
    margin-top: 20px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: white;
  }
  #container {
    width: 100%;
    height: 90%;
    background: white;
    
  }
  
}
</style>
<style >

</style>