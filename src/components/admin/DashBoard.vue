<template>
  <div class="dashboard">
    <div class="header">
      <center-header></center-header>
    </div>

    <div class="content">
      <div class="map">
        <order-map></order-map>
      </div>
      <div class="list"></div>
      <div class="rank">
        <auto-rank></auto-rank>
      </div>
    </div>
    <div class="footer">
      <category></category>

      <div class="areaRank">
        <area-rank></area-rank>
      </div>
    </div>
  </div>
</template>

<script>
import CenterHeader from './CenterHeader.vue'
import OrderMap from './OrderMap.vue'
import AutoRank from './AutoRank.vue'
import Category from './Category.vue'
import AreaRank from './AreaRank.vue'
export default {
  components: { CenterHeader, OrderMap, AutoRank, Category, AreaRank },

}
</script>

<style lang='scss' scoped>
.dashboard {
  height: 100%;
  .content {
    height: 58%;
    display: flex;
    .map {
      height: 100%;
      width: 60%;
    }
    .list {
      height: 100%;
      width: 10%;
      background-color: rgb(48, 48, 48);
    }
    .rank {
      height: 100%;
      //width:80%;
      flex: 1;
      //padding-right: 5%;
    }
  }
  .header {
    height: 15%;
  }
  .footer {
    height: 25%;
    width: 100%;
    background: rgb(48, 48, 48);

    .areaRank {
      width: 30%;
      height: 100%;
      float: right;
    }
  }
}
</style>