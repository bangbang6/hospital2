<template>
  <div class="sgx-center">
    <template>
      <div class="sgx-learn">
        <el-card shadow="always">
          <div class="front">
            <!--  <el-button type="primary" size="mini" @click="$router.back()">返回</el-button> -->
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
            <div class="title">可信中心节点日志</div>
            <div class="info">
              <div
                v-for="(item,index) in list"
                :class="`info${index+1}`"
                :key="item.org"
              >{{time1.toLocaleString()}}{{`节点${item.org}共有${item.number}个文件聚合到中心节点,结果为${item.result}`}}</div>

              <div
                class="info5"
                v-if="show5"
              >{{time3.toLocaleString()}} {{`正在计算文件结果${percentage}%`}}</div>
              <div class="info6" v-if="show6">{{time4.toLocaleString()}} {{`最终文件结果为${result}`}}</div>
            </div>
          </div>
        </el-card>
        <el-dialog title="结果" :visible.sync="dialogVisible" width="30%">
          <span>该文件的计算结果为:{{result}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </template>
  </div>
</template>
 
<script>
import md5 from 'md5'
export default {
  data () {
    return {
      list: [
        {
          org: "节点1",
          time: new Date(),
          number: 24,
          result: md5((((Math.random() * 5 + 85).toFixed(2)))),
        },
        {
          org: "节点2",
          time: new Date(),
          number: 8,
          result: md5((((Math.random() * 5 + 85).toFixed(2)))),

        },
        {
          org: "节点3",
          time: new Date(),
          number: 36,
          result: md5((((Math.random() * 5 + 85).toFixed(2)))),

        },
        {
          org: "节点4",
          time: new Date(),
          number: 14,
          result: md5((((Math.random() * 5 + 85).toFixed(2)))),

        },

      ],
      percentage: 0,
      result: md5((((Math.random() * 5 + 85).toFixed(2)))),
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      time1: new Date(),
      time2: new Date(),
      time3: new Date(),
      time4: new Date(),
      time5: new Date(),
      time6: new Date(),
      dialogVisible: false,
    }
  },
  mounted () {
    let index = 2

    let timer = setInterval(() => {

      this[`show${index}`] = true
      this[`time${index}`] = new Date()
      if (index === 5) {
        let timer2 = setInterval(() => {
          this.percentage += 2
          if (this.percentage === 100) {
            this[`show6`] = true
            this[`time6`] = new Date()
            this.dialogVisible = true
            clearInterval(timer2)
          }
        }, 100)
      }
      if (index === 5) {
        clearInterval(timer)
      }
      index++

    }, 100)
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
 