<template>
  <div class="err-detail">
    <div class="detail-wrapper">
      <div class="detail">
        <div class="title">{{title}}</div>
        <div class="message">
          <div class="line">
            <span class="key bold">基本信息</span>
            <span class="value"></span>
          </div>
          <div class="line">
            <span class="key">发起者</span>
            <span class="value">{{uploader}}</span>
          </div>
          <div class="line">
            <span class="key">发起者所在科室</span>
            <span class="value">{{department}}</span>
          </div>
          <div class="line">
            <span class="key">发起者所在部门</span>
            <span class="value">{{uploaderChannel}}</span>
          </div>
          <div class="line">
            <span class="key">文件id</span>
            <span class="value">{{fileId}}</span>
          </div>

          <div class="line">
            <span class="key">文件所在通道</span>
            <span class="value">{{fileChannel}}</span>
          </div>
          <div class="line">
            <span class="key">操作</span>
            <span class="value">{{action}}</span>
          </div>
          <div class="line">
            <span class="key">时间</span>
            <span class="value">{{formatDate(date)}}</span>
          </div>

          <div class="line">
            <span class="key">状态</span>
            <span class="value" :style="{color:'#F56C6C'}">{{status}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="status-wrapper">
      <div class="status-detail">
        <div class="message" v-if="type === 'danger'">
          <div class="line">
            <span class="key bold">状态详情</span>
            <span class="value"></span>
          </div>
          <div class="line">
            <span class="key">peer</span>
            <span class="value">{{peer}}</span>
          </div>
          <div class="line">
            <span class="key">操作</span>
            <span class="value">{{action}}</span>
          </div>
          <div class="line">
            <span class="key">目标channel</span>
            <span class="value">{{destChannel}}</span>
          </div>
        </div>
        <div class="message" v-else-if="type === 'warning'">
          <div class="line">
            <span class="key bold">状态详情</span>
            <span class="value"></span>
          </div>
          <div class="line">
            <span class="key">原始数据</span>
            <span class="value">{{originData}}</span>
          </div>
          <div class="line">
            <span class="key">上链数据</span>
            <span class="value">{{chainData}}</span>
          </div>
        </div>
        <div class="message" v-else>
          <div class="line">
            <span class="key bold">状态详情</span>
            <span class="value"></span>
          </div>
          <div class="list">
            <div class="list-item gray">
              <div class="updater">修改者</div>
              <div class="txId">交易号</div>
              <div class="updateDate">修改时间</div>
            </div>
            <div class="list-item" v-for="(updateItem,index) in updateHistorys" :key="index">
              <div class="updater">{{updateItem.updater}}</div>
              <div class="txId">{{updateItem.txId}}</div>
              <div class="updateDate">{{formatDate(updateItem.updateDate)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  props: {
    paper: Object
  },
  data () {
    return {
      title: '',
      uploader: '',
      hospital: '',
      department:'',
      uploaderChannel: '',
      fileId: '',
      fileChannel: '',
      action: '',
      date: new Date(),
      status: '',
      peer: "",
      type: '',
      destChannel: '',
      originData: '',
      chainData: "",
      updateHistorys: []

      /*   histroys: [
          {
            operation: "修改论文",
            user: '代老师',
            date: new Date()
          },
          {
            operation: "修改论文",
            user: '学生',
            date: new Date()
          },
          {
            operation: "上传论文",
            user: '代老师',
            date: new Date()
          },
        ] */
    }
  },
  methods: {
    formatDate (date) {
      return date.toLocaleString().slice(0, 9)
    },
  },
  mounted () {

    /* this.title = 'Trustzone-based secure lightweight wallet for hyperlerdger fabric'
    this.author = 'Weiqi Dai Qinyuan Zeli Wang Xiaobin Hai Jin'
    this.publicTypeName = '期刊'
    this.name = 'Journal of Parallel and Distributed Computing'
    this.date = new Date()
    this.projectNum = '0x0023104123'
    this.projectFund = '国家xx项目xx基金'
    this.uploader = '代老师'
    this.organization = '华中科技大学计算机学院cgcl实验室'
    this.chainDate = new Date() */
  },
  watch: {
    paper: {
      handler: function (newV) {
        if (!newV) return
        console.log('newV', newV);
        this.title = newV.title
        this.uploader = newV.uploader
        this.hospital = newV.hospital
        this.department = newV.department
        this.uploaderChannel = newV.channel
        this.date = newV.date
        this.fileId = '0x0023104123'
        this.status = newV.status
        this.action = newV.action
        this.type = newV.type
        this.fileChannel = newV.channel,
        this.peer = newV.peer,
        this.destChannel = newV.destChannel !== null ?newV.destChannel : '部门A'
        this.originData = newV.originData
        this.chainData = newV.chainData
        this.updateHistorys = newV.updateHistorys
      }

    }
  }
}
</script>
 
<style lang="scss" scoped>
.err-detail {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  .detail-wrapper,
  .status-wrapper {
    padding: 5px 10px;
    padding-top: 20px;

    box-sizing: border-box;
    .detail,
    .status-detail {
      .title {
        font-weight: bold;
        width: 70%;
        height: 60px;
      }
      .message {
        width: 100%;
        margin-top: 10px;
        .line {
          height: 30px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #bcd0f9;
          justify-content: space-between;
          .key,
          .value {
            font-size: 12px;
            &.bold {
              font-weight: bold;
              font-size: 12px;
            }
          }
        }
        .list {
          color: gray;
          margin-top: 10px;
          .list-item {
            display: flex;
            border-bottom: 1px solid #bcd0f9;
            /* border-bottom: 1px solid gray; */
            height: 20px;
            padding: 6px 20px 6px 0;
            align-items: center;
            .updater,
            .txId,
            .updateDate {
              height: 20px;
              /* padding: 5px 0; */
              text-align: center;
              font-size: 12px;
            }
            .updater {
              width: 80px;
            }
            .updateDate {
              width: 80px;
            }
            .txId {
              flex: 1;
            }

            /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
            &.gray {
              color: gray;
            }
          }
        }
      }
    }
    .operation {
      font-size: 12px;
      margin-top: 20px;
      .op {
        .bold {
          font-weight: bold;
        }
      }
      .op-detail {
        display: flex;
        justify-content: space-around;

        .con {
          width: 40px;
          position: relative;
          margin-top: 25px;
          margin-left: 40px;
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
            position: absolute;

            background: #1b60ec;
          }
          .bar {
            height: 60px;
            width: 1px;
            left: 4px;
            background: #87abf5;
            position: absolute;
          }
        }
        .time {
          position: relative;
          width: 150px;
          margin-left: 40px;
          .time-item {
            position: absolute;
            align-items: center;
          }
        }
        .tags {
          position: relative;
          width: 400px;
          margin-top: 22px;
          .tag-item {
            position: absolute;
            width: 70px;
            text-align: center;
          }
          .tag-item2 {
            position: absolute;
            width: 70px;
            left: 70px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>