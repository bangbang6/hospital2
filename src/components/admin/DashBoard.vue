<template>
  <div class="dashboard">
    <div class="header">
      <center-header></center-header>
    </div>

    <div class="content">
      <div class="map">
        <order-map></order-map>
        <!-- <test-2></test-2> -->
      </div>
      <!-- <div class="error">
        <error-list></error-list>
      </div>-->
      <div class="rank">
        <auto-rank></auto-rank>
      </div>
      <div class="block">
        <div class="begin">
          <smooth-line></smooth-line>
        </div>
        <div class="end">
          <category></category>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="category-wrapper">
        <block-list></block-list>
      </div>

      <div class="areaRank">
        <block-number></block-number>
      </div>
    </div>
  </div>
</template>

<script>
//!修改dashboard
import CenterHeader from './CenterHeader.vue'
import OrderMap from './OrderMap.vue'
import AutoRank from './AutoRank.vue'
import Category from './Category.vue'
import AreaRank from './AreaRank.vue'
import BlockNumber from './BlockNumber.vue'
import SmoothLine from './SmoothLine.vue'
import BlockList from './BlockList.vue'
import ErrorList from './ErrorList.vue'
import Test2 from './Test2.vue'
export default {
  components: { CenterHeader, OrderMap, AutoRank, Category, AreaRank, BlockNumber, ErrorList, Test2, BlockList, SmoothLine },

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
    }

    .block {
      height: 100%;
      //width:80%;
      width: 35%;
      margin-left: 20px;
      .begin {
        height: 50%;
        width: 100%;
      }
      .end {
        height: 50%;
        width: 100%;
      }

      //padding-right: 5%;
    }
    .rank {
      height: 100%;
      //width:80%;
      width: 28%;

      margin-left: -120px; //!删除的
    }
  }
  .header {
    height: 15%;
  }
  .footer {
    height: 23%;
    width: 100%;
    background: rgb(48, 48, 48);
    display: flex;
    .category-wrapper {
      width: 60%;
      height: 100%;
      display: flex;
    }
    .areaRank {
      width: 38%;
      height: 100%;
      padding-left: 20px;
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
}
</style>