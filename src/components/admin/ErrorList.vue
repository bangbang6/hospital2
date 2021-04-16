<template>
  <div class="error-list">
    <div class="title">异常文件</div>
    <div class="list">
      <div class="list-item gray">
        <div class="status">状态</div>
        <div class="paper-title">文件名</div>
        <div class="author">上传者</div>
        <div class="type">所在医院</div>
        <div class="date">上链时间</div>
      </div>
      <div
        class="list-item"
        v-for="(paper,index) in papers"
        :key="index"
        @click="handleClick(index)"
      >
        <div class="paper-title">
          <el-tag :type="paper.type" size="mini" effect="dark">{{paper.status}}</el-tag>
        </div>
        <div class="paper-title">{{paper.title}}</div>
        <div class="author">{{paper.uploader}}</div>
        <div class="type">{{paper.hospital}}</div>
        <div class="date">{{formatDate(paper.chainDate)}}</div>
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
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',
      },
      {
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '多次修改',
        type: 'warning',


      },
      {
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '多次修改',
        type: 'warning',


      },
      {
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },
      {
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '名字重复',
        type: 'danger',


      },

      {
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '多次修改',
        type: 'warning',



      },
      {
        title: "Foridar",
        uploader: 'bang',
        hospital: '同济医院',
        chainDate: new Date(),
        status: '多次修改',
        type: 'warning',


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
        /* padding: 5px 0; */
        text-align: center;
        font-size: 12px;
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