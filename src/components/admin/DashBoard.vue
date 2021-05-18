<template>
  <div class="dashboard">
    <div class="header">
      <center-header></center-header>
    </div>

    <div class="content">
      <div class="map">
        <!-- <order-map></order-map> -->
        <GDMap></GDMap>
      </div>
      <div class="error">
        <error-list></error-list>
      </div>
      <div class="rank">
        <auto-rank></auto-rank>
      </div>
    </div>
    <div class="footer">
      <category></category>

      <div class="areaRank">
        <block-number></block-number>
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
import BlockNumber from './BlockNumber.vue'
import ErrorList from './ErrorList.vue'
import GDMap from './GDMap.vue'
export default {
  components: { CenterHeader, OrderMap, AutoRank, Category, AreaRank, BlockNumber, ErrorList, GDMap },

}
</script>

<style lang='scss' scoped>
.dashboard {
  height: 100%;
  .content {
    padding-left: 100px;
    padding-left: 50px; //!删除的
    box-sizing: border-box;
    height: 58%;
    display: flex;
    .map {
      height: 100%;
      width: 48%;
      box-sizing: border-box;
      padding-right: 30px;
    }

    .rank {
      height: 100%;
      //width:80%;
      width: 35%;
      margin-left: 20px;
      //padding-right: 5%;
    }
    .error {
      height: 100%;
      //width:80%;
      width: 28%;
    }
  }
  .header {
    height: 15%;
  }
  .footer {
    height: 23%;
    width: 100%;
    background: rgb(48, 48, 48);

    .areaRank {
      width: 38%;
      height: 100%;
      float: right;
    }
  }
}
</style>