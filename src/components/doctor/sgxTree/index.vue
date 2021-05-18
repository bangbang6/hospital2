<template>
  <div class="sgx-center">
    <div class="file">
      <el-card class="file-list">
        <div>
          <div class="title">
            <div :style="{fontWeight:'bold'}">文件列表:</div>
            <div class="btns">
              <el-button type="primary" size="mini" class="btn">选择文件参与运算</el-button>
              <input type="file" class="upload" multiple="multiple" @change="changeFile" />
            </div>
          </div>
          <div class="list">
            <div class="list-item bold">
              <div class="file-name">文件名</div>
              <div class="update-time">上传时间</div>
              <div class="size">文件大小</div>
              <div class="calc-status">计算状态</div>
              <div class="blockNumber">文件处理区块号</div>
              <div class="param-status">参数状态</div>
            </div>
            <div
              class="list-item"
              v-for="(file,index) in files"
              :key="index"
              @click="handleClick(index)"
            >
              <div class="file-name overflow">{{file.name}}</div>
              <div class="update-time overflow">{{formateDate(file.updateTime)}}</div>
              <div class="size overflow">{{file.size}}</div>
              <div class="calc-status overflow">{{file.calcStatus}}</div>
              <div class="blockNumber overflow">{{file.blockNumber}}</div>
              <div class="param-status overflow">{{file.paramStatus}}</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="file-share">
        <div>
          <div class="title">
            <div :style="{fontWeight:'bold'}">文件共享情况:</div>
          </div>
          <div class="list">
            <div class="list-item bold">
              <div class="treeNumber">节点编号</div>
              <div class="fileNumber">文件总数目</div>
              <div class="update-time">上传时间</div>
            </div>
            <div
              class="list-item"
              v-for="(tree,index) in shareTrees"
              :key="index"
              @click="handleClick(index)"
            >
              <div class="treeNumber overflow">{{tree.no}}</div>
              <div class="fileNumber overflow">{{tree.fileNumber}}</div>
              <div class="update-time overflow">{{formateDate(tree.updateTime)}}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="log">
      <div>
        <div class="title">
          <div :style="{fontWeight:'bold'}">本数据节点计算过程:</div>
        </div>
        <div class="info" ref="info">
          <div class="info1" v-if="show1">{{time1.toLocaleString()}}节点参数状态：等待参数返回</div>
          <div class="info2" v-if="show2">{{time2.toLocaleString()}}节点参数状态：已更新</div>
          <div class="info3" v-if="show3">{{time3.toLocaleString()}} {{`数据训练中：${percentage}%`}}</div>

          <div class="info4" v-if="show4">{{time4.toLocaleString()}} {{`数据训练结果为：${result}`}}</div>
          <div class="info5" v-if="show5">{{time5.toLocaleString()}} {{`数据参数上传中:${percentage2}%`}}</div>
          <div class="info6" v-if="show6">{{time6.toLocaleString()}} {{`参数数据状态更改中...`}}</div>
          <div class="info7" v-if="show7">{{time7.toLocaleString()}} {{`节点参数状态：已上传`}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>
 
<script>
export default {

  data () {
    return {
      files: [
        {
          name: 'wjeaoif',
          updateTime: new Date(2020, 5, 6),
          size: '342MB',
          calcStatus: '计算中',
          blockNumber: 'n3k2j5k2nkwnri4r290rjw',
          paramStatus: "本节点计算中"
        },
        {
          name: 'mf293jf',
          updateTime: new Date(2020, 5, 4),
          size: '892MB',
          calcStatus: '计算结束',
          blockNumber: 'jd92jd2398d2icuj2j93n2',
          paramStatus: "参数已回馈更新"
        },
        {
          name: 'n9cnc82',
          updateTime: new Date(2020, 5, 2),
          size: '58MB',
          calcStatus: '计算结束',
          blockNumber: 's89cw98sjc78whjwef87we',
          paramStatus: "参数已回馈更新"
        },
      ],
      shareTrees: [
        {
          no: 'xxxxx',//!修改编号
          fileNumber: 14,
          updateTime: new Date(2020, 5, 6)
        },
        {
          no: 'xxxxx',
          fileNumber: 14,
          updateTime: new Date(2020, 5, 6)
        },
        {
          no: 'xxxxx',
          fileNumber: 14,
          updateTime: new Date(2020, 5, 6)
        },
        {
          no: 'xxxxx',
          fileNumber: 14,
          updateTime: new Date(2020, 5, 6)
        },
      ],
      time1: new Date(),
      time2: new Date(),
      time3: new Date(),
      time4: new Date(),
      time5: new Date(),
      time6: new Date(),
      time7: new Date(),
      show2: false,
      show1: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      percentage: 0,
      percentage2: 0,
      result: `
      bk25b34j6b3k4j5b23kb5k34hb5l23jb5h4523jkb542j3b5jh245bk
      j23c79sd8798sd7v98sd7v9s8d7v98sd7v98s7v9s8d7v98sd7sd98v
      7sd98v79s87v9as8c98hf94nlQFM	P249JFijq9834jfliEWHGQO
      HKGAWUHBOG	;I2N4TGO3QGNweguhqp938rfnakwjrbgp24gnkj
      earhp3qoignwit2o
      inbguy5qhq938tnl2gh;owihq9qpscsa97cas98cu98cas98c7asu98
      cds98vu98
      guf89uhda98fhuse98uas7gtoeiurjgq3598qtjweoigj9p84gjqori
      wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
      4whgoiweahgq984p3ghwu4hqo4wihgwi
      4uqhfiwoehg984qhgWIEHGQ9P8F34FJOWIEHQF9P4HF;GHWEQPW98HG
      W;UIQHGOWI;GHQP98WHFOA;WHGQ[0OJEIGQ[3GJW;OIQU2OI4QHT983
      IJGweiorj2fop3ginqoicm	qfweguhqp938rfnakwjrbgp24gnkjear
      hp3qoignwit2o
      inbguy5qhq938tnl2gh;ow
      guf89uhda98fhuse98uas7gtoeiurjgq3598qtjweoigj9p84gjqori
      wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
      4whgoiweahgq984p3ghwu4hqo4wihgwi
      4uqhfiwoehg984qhgWIEHGQ9P8F34FJOWIEHQF9P4HF;GHWEQPW98HG
      W;UIQHGOWI;GHQP98WHFOA;Wihq9qpscsa97cas98cu98cas98c7asu98
      cds98vu98
      guf89uhda98fhuse98uas7gtoeiurjgq3598qtjweoigj9p84gjqori
      wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
      4whgoiweahgq984p3ghwu4hqo4wih	3iofnoqi4jgfpoqwfih	
      oi23fjqlkwgh	owijflqkH	OIFNLEQP294FNLKWQNEJGPW
      AJDNP'klwjbkqpqiuwgnLKQENGI834jfliEWHGQOHKGAWUHBOG	;I
      2N4TGO3QGNweguhqp938rfnakwjrbgp24gnkjearhp3qoignwit2o
      inbguy5qhq938tnl2gh;owihq9qpscsa97cas98cu98cas98c7asu98
      cds98vu98
      guf89uhda98fhuse98uas7gtoeiurjgq3598qtjweoigj9p84gjqori
      wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
      4whgoiweahgq984p3ghwu4hqo4wihgwi
      4uqhfiwoehg984qhgWIEHGQ9P8FEOGJJ'
      wlgjaojg09wegjiqoijrgiw84gjakerhioergho8w45ghaeiroeqrih
      85sanf	83nf	u4u92fnqoJ023TJGNWRJNG	2OJFNqkjge42uq.
      LQKJNFE;OWIF;Oqijfaoih28fnQKJEVNIU	2Kjqebvilubcajv
      rwhbliUBEWQ3UHFNHQO;uhgqo	iNQLEIUH	2
`
    }
  },
  methods: {
    formateDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
    showLog () {
      let index = 2
      this.show1 = true
      let ele = this.$refs.info

      this.time1 = new Date()
      this.percentage = 0
      this.percentage2 = 0
      let timer = setInterval(() => {
        if (index !== 4 && index !== 6) {
          this[`show${index}`] = true
          this[`time${index}`] = new Date()
        }



        ele.scrollTop = ele.scrollHeight

        if (index === 3) {
          let timer2 = setInterval(() => {
            this.percentage += 2
            if (this.percentage >= 100) {
              this[`show4`] = true
              this[`time4`] = new Date()
              this[`show5`] = true
              this[`time5`] = new Date()
              index = 5
              ele.scrollTop = ele.scrollHeight
              /* ele.scrollTo(0, ele.scrollHeight) */
              clearInterval(timer2)


            }
          }, 40)

        }
        if (index === 5) {
          let timer2 = setInterval(() => {

            this.percentage2 += 2
            if (this.percentage2 >= 100) {
              this[`show6`] = true
              this[`time6`] = new Date()
              index = 6
              ele.scrollTop = ele.scrollHeight
              clearInterval(timer2)


            }
          }, 40)

        }

        if (index === 7) {
          ele.scrollTop = ele.scrollHeight
          clearInterval(timer)


        }
        index++

      }, 2500)


    },
    changeFile (e) {
      console.log('e', e);
      console.log('e.target.files', e.target.files);
      let newFiles = Array.prototype.slice.call(e.target.files);
      newFiles = newFiles.map((file) => ({
        name: file.name,
        updateTime: new Date(),
        size: (file.size / 1024 / 1024).toFixed(2) + 'MB',
        calcStatus: '计算中',
        blockNumber: 'n3k2j5k2nkwnri4r290rjw',
        paramStatus: "本节点计算中"
      }))
      this.files.unshift(...newFiles)
      this.showLog()
    }
  },
  mounted () {
    /* this.showLog() */
  }
}
</script>
 
<style lang="scss" scoped>
.sgx-center {
  width: 100%;
  .file {
    display: flex;
    margin-top: 20px;
    height: 400px;
    .file-list {
      width: 70%;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .btns {
          position: relative;
          width: 120px;
          height: 30px;
          .upload {
            opacity: 0;
            position: absolute;
            top: 0px;
            left: 0;
            width: 120px;

            height: 30px;
            line-height: 30px;
            cursor: pointer;
          }
          .btn {
            height: 30px;
            position: absolute;

            top: 0px;
            left: 0;
            width: 120px;
            cursor: pointer;
          }
        }
      }
      .list {
        margin-top: 20px;
        .list-item {
          display: flex;
          border-bottom: 1px solid #eee;
          .file-name,
          .update-time,
          .size,
          .calc-status,
          .blockNumber,
          .param-status {
            flex: 1;
            width: 20%;
            height: 20px;
            padding: 5px 5px;
            text-align: center;
            font-size: 12px;
          }
          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }

          /* &:nth-child(odd) {
              background: #f2f2f2;
            }
            &:nth-child(even) {
              background: white;
            } */
          &.bold {
            font-weight: bold;
          }
        }
      }
    }
    .file-share {
      width: 30%;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .list {
        margin-top: 26px;
        .list-item {
          display: flex;
          border-bottom: 1px solid #eee;
          .treeNumber,
          .update-time,
          .fileNumber {
            flex: 1;
            width: 20%;
            height: 20px;
            padding: 5px 5px;
            text-align: center;
            font-size: 12px;
          }
          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }

          /* &:nth-child(odd) {
              background: #f2f2f2;
            }
            &:nth-child(even) {
              background: white;
            } */
          &.bold {
            font-weight: bold;
          }
        }
      }
    }
  }
  .log {
    margin-top: 20px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .info {
      margin-top: 10px;
      background: black;
      height: 200px;
      overflow: auto;
      color: white;
      /*  padding: 10px;
      box-sizing: border-box; */
      font-size: 12px;
    }
  }
}
</style>