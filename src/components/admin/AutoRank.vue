<template>
  <div class="sales-view-list">
    <div class="sales-view-title">数据节点贡献情况</div>
    <div class="sales-view-subTitle">Data node contribution</div>
    <div class="list-item-wrapper">
      <div class="list-item" v-for="item in rankData" :key="item.no">
        <div :class="['list-item-no',+item.no <=3 ? 'top-no': '']">{{item.no}}</div>
        <div class="list-item-name">{{item.name}}</div>
        <!-- <div class="list-item-phone">{{item.phone}}</div> -->
        <div class="list-item-number">{{item.fileNumber}}</div>
        <div class="list-item-address">{{item.address}}</div>
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
        name: '节点本地计算中',
        address: "武汉同济医院",
        phone: "156XXXX5790",
        fileNumber: 8930213
      },
      {
        no: 2,
        name: '参数上传中',
        address: "北京大学第一医院",
        phone: "157XXXX5790",
        fileNumber: 4812323
      },
      {
        no: 3,
        name: '参数已更新',
        address: "北京大学第三医院",
        phone: "157XXXX5790",
        fileNumber: 4812369
      },
      {
        no: 4,
        name: '参数已更新',
        address: "西安交通大学第一附属医院",
        phone: "157XXXX5790",
        fileNumber: 4512323
      },
      {
        no: 5,
        name: '参数已更新',
        address: "海南人民医院",
        phone: "157XXXX5790",
        fileNumber: 48123541
      },
      {
        no: 6,
        name: '参数已更新',
        address: "武汉同济医院分院",
        phone: "157XXXX5790",
        fileNumber: 4612323
      },
      {
        no: 7,
        name: '参数已更新',
        address: "北京大学第三医院分院",
        phone: "157XXXX5790",
        fileNumber: 4312321
      },
      {
        no: 8,
        name: '参数已更新',
        address: "北京大学第一医院分院",
        phone: "157XXXX5790",
        fileNumber: 4012350
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
    margin-top: 40px;
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
        width: 100px;
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