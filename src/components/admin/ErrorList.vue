<template>
  <div class="error-list">
    <div class="title">异常文件</div>
    <div class="list">
      <div class="list-item gray">
        <div class="status" :style="{padding: '0 3px'}">状态</div>
        <div class="paper-title">发起者</div>
        <div class="author">医院</div>
        <div class="type">文件</div>
        <div class="date">时间</div>
      </div>
      <div
        class="list-item"
        v-for="(paper,index) in papers"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="paper-title">
          <el-tag
            :type="paper.type"
            size="mini"
            effect="dark"
            :style="{width:'80px'}"
          >{{paper.status}}</el-tag>
        </div>
        <div class="paper-title overflow">{{paper.uploader}}</div>
        <div class="author overflow" :style="{width:'240px'}">{{paper.hospital}}</div>
        <div class="type overflow">{{paper.title}}</div>
        <div class="date overflow">{{formatDate(paper.date)}}</div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      papers: []
    }
  },
  methods: {
    formatDate (date) {
      return date.toLocaleString().slice(0, 9)
    },

    handleClick (index) {
      let title = this.papers[index].title
      this.$router.push({
        path: "/admin/errorStatus",
        query: { title: title }
      })
    }

  },
  mounted () {
    this.papers = [

      {
        title: "病例0X2132",
        uploader: '李医生',
        hospital: '广东人民医院',
        date: new Date(),
        status: '越权操作',
        type: 'danger',
      },
      {
        title: "病例0X8219",
        uploader: '王医生',
        hospital: '南京鼓楼医院',
        date: new Date(),
        status: '数据不一致',
        type: 'warning',
      },
      {
        title: "病例0X0123",
        uploader: '张医生',
        hospital: '华西口腔医院',
        date: new Date(),
        status: '多次修改',
        type: 'info',
      },
      {
        title: "病例0X7632",
        uploader: '陈医生',
        hospital: '吉大第一医院',
        date: new Date(),
        status: '数据不一致',
        type: 'warning',
      },
      {
        title: "病例0X2521",
        uploader: '刘医生',
        hospital: '同济医院',
        date: new Date(),
        status: '越权操作',
        type: 'danger',
      },
      {
        title: "病例0X6321",
        uploader: '杨医生',
        hospital: '齐鲁医院',
        date: new Date(),
        status: '越权操作',
        type: 'danger',


      },

      {
        title: "病例0X6312",
        uploader: '黄医生',
        hospital: '上海第六医院',
        date: new Date(),
        status: '数据不一致',
        type: 'warning',



      },
      {
        title: "病例0X5213",
        uploader: '胡医生',
        hospital: '武汉第一医院',
        date: new Date(),
        status: '多次修改',
        type: 'info',


      }





    ]
  }
}
</script>
 
<style lang="scss" scoped>
.error-list {
  margin-top: 60px;
  color: white;
  overflow-y: auto;
  height: 100%;
  .title {
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    font-weight: 500;
  }
  .list {
    color: gray;
    margin-top: 10px;
    .list-item {
      display: flex;
      /* border-bottom: 1px solid gray; */
      height: 20px;
      padding: 6px 20px 6px 0;
      align-items: center;
      .paper-title,
      .author,
      .type,
      .date,
      .status {
        flex: 1;
        height: 20px;
        /* padding: 0 5px; */
        text-align: center;
        font-size: 12px;
      }
      .overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
</style>