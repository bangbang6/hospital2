<template>
  <div class="sgx-learn">
    <el-card shadow="always">
      <div class="front">
        <el-button type="primary" size="mini" @click="$router.back()">返回</el-button>
      </div>

      <div class="join-list">
        <div class="title">节点列表</div>
        <div class="list-wrapper">
          <div
            class="list-item"
            v-for="item in list"
            :key="item.org"
          >{{`${item.org}共有${item.number}个文件加入联邦学习,时间${item.time.toLocaleString()}`}}</div>
        </div>
      </div>

      <div class="calc-progress">
        <div class="title">计算信息</div>
        <div class="info">
          <div class="info1">{{time1.toLocaleString()}} 正在重新计算模型参数...</div>
          <div class="info2" v-if="show2">{{time2.toLocaleString()}} 正在向中心节点聚合...</div>
          <div class="info3" v-if="show3">{{time3.toLocaleString()}} {{`正在计算文件百分比${percentage}%`}}</div>
          <div class="info4" v-if="show4">{{time4.toLocaleString()}} {{`文件结果为${result}%`}}</div>
        </div>
      </div>
    </el-card>
    <el-dialog title="结果" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>该文件的计算结果为:{{result}}%</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      list: [
        {
          org: "节点1",
          time: new Date(),
          number: 24
        },
        {
          org: "节点2",
          time: new Date(),
          number: 8
        },
        {
          org: "节点3",
          time: new Date(),
          number: 36
        },
        {
          org: "节点4",
          time: new Date(),
          number: 14
        },

      ],
      percentage: 0,
      result: (((Math.random() * 5 + 85).toFixed(2))),
      show2: false,
      show3: false,
      show4: false,
      time1: new Date(),
      time2: new Date(),
      time3: new Date(),
      time4: new Date(),
      dialogVisible: false,
    }
  },
  mounted () {
    let index = 2

    let timer = setInterval(() => {

      this[`show${index}`] = true
      this[`time${index}`] = new Date()
      if (index === 3) {
        let timer2 = setInterval(() => {
          this.percentage += 2
          if (this.percentage === 100) {
            this[`show4`] = true
            this[`time4`] = new Date()
            this.dialogVisible = true
            clearInterval(timer2)
          }
        }, 100)
      }
      if (index === 3) {
        clearInterval(timer)
      }
      index++

    }, 3000)
  }
}
</script>
 
<style lang="scss" scoped>
.sgx-learn {
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;

  .join-list {
    margin-top: 20px;

    overflow: auto;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .list-wrapper {
      height: 220px;
      overflow: auto;
      .list-item {
        height: 30px;
        margin-top: 10px;
        font-size: 14px;
        padding-top: 5px;
        padding-bottom: 5px;
        box-sizing: border-box;
      }
    }
  }
  .calc-progress {
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .info {
      margin-top: 10px;
      background: black;
      height: 220px;
      overflow: auto;
      color: white;
      /*  padding: 10px;
      box-sizing: border-box; */
      font-size: 12px;
    }
  }
}
</style>