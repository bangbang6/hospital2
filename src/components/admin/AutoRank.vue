<template>
  <div class="sales-view-list">
    <div class="sales-view-title">排行榜</div>
    <div class="sales-view-subTitle">The Ranking Of Doctors</div>
    <div class="list-item-wrapper">
      <div class="list-item" v-for="item in rankData" :key="item.no">
        <div :class="['list-item-no',+item.no <=3 ? 'top-no': '']">{{item.no}}</div>
        <div class="list-item-name">{{item.name}}</div>
        <!-- <div class="list-item-phone">{{item.phone}}</div> -->
        <div class="list-item-number">{{item.fileNumber}}</div>
        <div class="list-item-address">{{item.department}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rankData: [{
        no: 1,
        name: '李医生',
        address: "武汉同济医院",
        department: '影像科',
        phone: "156XXXX5790",
        fileNumber: 140
      },
      {
        no: 2,
        name: '王医生',
        address: "武汉协和医院",
        department: '影像科',
        phone: "157XXXX5790",
        fileNumber: 112
      },
      {
        no: 3,
        name: '胡医生',
        address: "武汉大学人民医院",
        department: '耳鼻喉科',
        phone: "157XXXX5790",
        fileNumber: 104
      },
      {
        no: 4,
        name: '付医生',
        address: "华西医院",
        department: '影像科',
        phone: "157XXXX5790",
        fileNumber: 94
      },
      {
        no: 5,
        name: '刘医生',
        address: "北京大学第一医院",
        department: '耳鼻喉科',
        phone: "157XXXX5790",
        fileNumber: 86
      },
      {
        no: 6,
        name: '赵医生',
        address: "同济医院",
        department: '影像科',
        phone: "157XXXX5790",
        fileNumber: 82
      },
      {
        no: 7,
        name: '赵医生',
        address: "中山医院",
        department: '影像科',
        phone: "157XXXX5790",
        fileNumber: 76
      },
      {
        no: 8,
        name: '赵医生',
        address: "华山医院",
        department: '耳鼻喉科',
        phone: "157XXXX5790",
        fileNumber: 65
      }

      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.sales-view-list {
  margin-right: -10px;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(48, 48, 48);

  color: gray;
  .sales-view-subTitle {
    margin-top: 5px;
    font-size: 12px;

    color: gray;
  }
  .sales-view-title {
    margin-top: 60px;
    font-size: 18px;

    color: white;
    font-weight: 500;
  }

  .list-item-wrapper {
    margin-top: 15px;

    .list-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      height: 20px;
      padding: 6px 20px 6px 0;

      .list-item-no {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        box-sizing: border-box;

        &.top-no {
          background: #000;
          border-radius: 50%;
          color: #fff;
          font-weight: 500;
        }
      }

      .list-item-name {
        margin-left: 10px;
        color: gray;
        width: 40px;
      }
      .list-item-phone {
        margin-left: 40px;
        color: gray;
        width: 100px;
      }
      /* .list-item-number {
        margin-left: 80px;
        color: gray;
        width: 40px;
      } */
      .list-item-address {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>