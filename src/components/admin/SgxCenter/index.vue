<template>
  <div class="sgx-center">
    <div class="head">
      <div :style="{fontWeight:'bold'}">联合计算中心-数据中心节点</div>
      <div class="btn-wrapper">
        <el-button
          type="primary"
          size="mini"
          @click="$router.back()"
          :style="{marginRight:'10px'}"
        >返回</el-button>
        <el-button type="primary" size="mini" @click="$router.push('/admin/dashboard')">中心节点详情</el-button>
      </div>
    </div>

    <el-card class="tree-list">
      <div>
        <div class="title">节点列表</div>
        <div class="list">
          <div class="list-item bold">
            <div class="tree-no">节点编号</div>
            <div class="update-param">参数上传时间</div>
            <div class="close">聚合情况</div>
            <div class="blockNumber">区块链区块号</div>
            <div class="grade">数据贡献度</div>
          </div>
          <div
            class="list-item"
            v-for="(tree,index) in trees"
            :key="index"
            @click="handleClick(index)"
          >
            <div class="tree-no overflow">{{tree.no}}</div>
            <div class="update-param overflow">{{formateDate(tree.paramTime)}}</div>
            <div class="close overflow">{{tree.close}}</div>
            <div class="blockNumber overflow">{{tree.blockNumber}}</div>
            <div class="grade overflow">
              {{tree.grade}}
              <span class="detail" @click="dialogVisible=true">详情</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="log">
      <div>
        <div class="title">本数据节点计算过程</div>
        <div class="info" ref="info">
          <div class="info1" v-if="show1">{{time1.toLocaleString()}}数据迭代编号为：DF0809-723</div>
          <div class="info2" v-if="show2">{{time2.toLocaleString()}}{{`参数接收:${result}`}}</div>
          <div class="info3" v-if="show3">{{time3.toLocaleString()}} {{`参数聚合中${percentage}%`}}</div>

          <div class="info4" v-if="show4">{{time4.toLocaleString()}} {{`结果为：${result2}`}}</div>
          <div class="info5" v-if="show5">{{time5.toLocaleString()}} {{`结果反馈中:${percentage2}%`}}</div>
        </div>
      </div>
    </el-card>
    <el-dialog title="贡献度计算历史 (数据类型*数据大小)" :visible.sync="dialogVisible">
      <el-table :data="historys">
        <el-table-column
          property="date"
          label="时间"
          width="200"
          :formatter="(row)=>formateDate2(row.date)"
        ></el-table-column>
        <el-table-column property="size" label="数据大小"></el-table-column>
        <el-table-column property="grade" label="贡献度"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      //!修改数据
      historys: [
        {
          date: new Date('December 18, 1995 03:24:00'),
          size: '512MB',
          grade: 12
        },
        {
          date: new Date('December 18, 1995 03:24:00'),
          size: '512MB',

          grade: 12
        },
        {
          date: new Date('December 18, 1995 03:24:00'),
          size: '512MB',

          grade: 12
        },
      ],
      trees: [
        {
          no: 'm92c23c',
          paramTime: new Date(2020, 5, 6),
          close: '计算中',
          blockNumber: 'vs9v8w9e8v9w8rvuw89euwe89',
          grade: '57分'
        },
        {
          no: 'cq09wes',
          paramTime: new Date(2020, 5, 6),
          close: '等待中',
          blockNumber: 'cweucw98cw93m4m2iu3huwey4',
          grade: '179分'
        },
        {
          no: 'v34vf4v',
          paramTime: new Date(2020, 5, 3),
          close: '参数已更新',
          blockNumber: 'cewc9qwievc9ewviw9euv82eu',
          grade: '42分'
        },
      ],
      time1: new Date(),
      time2: new Date(),
      time3: new Date(),
      time4: new Date(),
      time5: new Date(),

      show2: false,
      show1: false,
      show3: false,
      show4: false,
      show5: false,

      percentage: 0,
      percentage2: 0,
      result2: `wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
4whgoiweahgq984p3ghwu4hqo4wih	3iofnoqi4jgfpoqwfih	
oi23fjqlkwgh	owijflqkH	OIFNLEQP294FNLKWQNEJGPW
AJDNP'klwjbkqpqiuwgnLKQENGI834jfliEWHGQOHKGAWUHBOG	;I2N4TGO3QGNweguhqp938rfnakwjrbgp24gnkjearhp3qoignwit2o
inbguy5qhq938tnl2gh;owihq9qpscsa97cas98cu98cas98c7asu98
cds98vu98
	ewioghq9p84gjowiehgq98p
4whgoiweahgq984p3ghwu4hqo4wih	3iofnoqi4jgfpoqwfih	
oi23fjqlkwgh	owijflqkH	OIFNLEQP294FNLKWQNEJGPW
AJDNP'klwjbkqpqiuwgnLKQENGI834jfliEWHGQOHKGAWUHBOG	;I2N4TGO3QGNweguhqp938rfnakwjrbgp24gnkjearhp3qoignwit2o
inbguy5qhq938tnl2gh;owihq9qpscsa97cas98cu98cas98c7asu98
cds98vu98
guf89uhda98fhuse98uas7gtoeiurjgq3598qtjweoigj9p84gjqori
wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
4whgoiweahgq984p3ghwu4hqo4wihgwi
4uqhfiwoehg984qhgWIEHGQ9P8FEOGJJ'
wlgjaojg09wegjiqoijrgiw84gjakerhioergho8w45ghaeiroeqrih
85sanf	83nf	u4u92fewioghq9p84gjowiehgq98p
4whgoiweahgq984p3ghwu4hqo4wih	3iofnoqi4jgfpoqwfih	
oi23fjqlkwgh	owijflqkH	OIFNLEQP294FNLKWQNEJGPW
AJDNP'klwjbkqpqiuwgnLKQENGI834jfliEWHGQOHKGAWUHBOG	;I2N4TGO3QGNweguhqp938rfnakwjrbgp24gnkjearhp3qoignwit2o
inbguy5qhq938tnl2gh;owihq9qpscsa97cas98cu98cas98c7asu98
cds98vu98
guf89uhda98fhuse98uas7gtoeiurjgq3598qtjweoigj9p84gjqori
wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
4whgoiweahgq984p3ghwu4hqo4wihgwi
4uqhfiwoehg984qhgWIEHGQ9P8FEOGJJ'
wlgjaojg09wegjiqoijrgiw84gjakerhioergho8w45ghaeiroeqrih`,
      result: `bk25b34j6b3k4j5b23kb5k34hb5l23jb5h4523jkb542j3b5jh245bk
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
AJDNP'klwjbkqpqiuwgnLKQENGI834jfliEWHGQOHKGAWUHBOG	;I2N4TGO3QGNweguhqp938rfnakwjrbgp24gnkjearhp3qoignwit2o
inbguy5qhq938tnl2gh;owihq9qpscsa97cas98cu98cas98c7asu98
cds98vu98
guf89uhda98fhuse98uas7gtoeiurjgq3598qtjweoigj9p84gjqori
wjf89357wf3qwjeioaguhq7934thgj	ewioghq9p84gjowiehgq98p
4whgoiweahgq984p3ghwu4hqo4wihgwi
4uqhfiwoehg984qhgWIEHGQ9P8FEOGJJ'
wlgjaojg09wegjiqoijrgiw84gjakerhioergho8w45ghaeiroeqrih
85sanf	83nf	u4u92fnqoJ023TJGNWRJNG	2OJFNqkjge42uq.
LQKJNFE;OWIF;Oqijfaoih28fnQKJEVNIU	2Kjqebvilubcajv
rwhbliUBEWQ3UHFNHQO;uhgqo	iNQLEIUH	2`,

    }
  },
  methods: {
    formateDate (date) {
      let str = new Date(date).toLocaleString()
      let index = new Date(date).toLocaleString().indexOf('午')
      return str.slice(0, index - 1)
    },
    formateDate2 (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    showLog () {
      let index = 2
      this.show1 = true
      this.time1 = new Date()
      let timer = setInterval(() => {
        let ele = this.$refs.info
        if (index !== 4) {
          this[`show${index}`] = true
          this[`time${index}`] = new Date()
        }


        ele.scrollTo(0, ele.scrollHeight)
        if (index === 3) {
          let timer2 = setInterval(() => {
            this.percentage += 2
            if (this.percentage >= 100) {
              this[`show4`] = true
              this[`time4`] = new Date()
              /* ele.scrollTop = ele.scrollHeight */
              ele.scrollTo(0, ele.scrollHeight)
              clearInterval(timer2)


            }
          }, 40)

        }
        if (index === 5) {

          let timer2 = setInterval(() => {
            this.percentage2 += 2

            if (this.percentage2 >= 100) {

              /*  ele.scrollTop = ele.scrollHeight */
              ele.scrollTo(0, ele.scrollHeight)
              clearInterval(timer2)


            }
          }, 40)

        }

        if (index === 5) {
          /*           ele.scrollTop = ele.scrollHeight */
          clearInterval(timer)


        }
        index++

      }, 2500)
    },
  },
  mounted () {
    this.showLog()
  }
}
</script>
 
<style lang="scss" scoped>
.sgx-center {
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;

  .head {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    box-sizing: border-box;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
  }
  .tree-list {
    margin-top: 10px;
    height: 400px;

    .title {
      font-weight: bold;
    }
    .list {
      margin-top: 20px;
      .list-item {
        display: flex;
        border-bottom: 1px solid #eee;
        .tree-no,
        .update-param,
        .close,
        .blockNumber,
        .grade {
          flex: 1;
          width: 20%;
          height: 20px;
          padding: 5px 5px;
          text-align: center;
          font-size: 12px;
          .detail {
            font-size: 12px;
            color: rgb(64, 158, 255);
            margin-left: 5px;
            cursor: pointer;
            transform: scale(0.9);
            display: inline-block;
          }
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
  .log {
    margin-top: 20px;
    .title {
      font-weight: bold;
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