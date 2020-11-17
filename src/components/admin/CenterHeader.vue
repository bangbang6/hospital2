<template>
  <div class="center-header">
    <div class="center-header-wrapper">
      <div class="center-header-item" v-for="(item, index) in headerData" :key="index">
        <div class="center-header-left">
          <i :class="[item.icon,item.color]" class="icon"></i>
        </div>
        <div class="center-header-right">
          <div class="title">{{item.title}}</div>
          <div class="sub-title">{{item.subTitle}}</div>
          <div class="total">{{item.value}}</div>
        </div>
      </div>
    </div>
    <!--   <div class="project-wrapper">
      <div class="project" v-for="(item, index) in project" :key="index">
        <div class="project-img">
          <img :src="item.img" />
        </div>
        <div class="project-text">{{item.title}}</div>
        <div class="project-value">{{item.value}}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
const headerMockData = { "headerData": { "value": [{ "title": "总用户", "subTitle": "The Total User Number", "value": 4010, "icon": "el-icon-user-solid", color: 'blue' }, { "title": "上传总数", "subTitle": "The Upload Files Number", "value": 2570, "icon": "el-icon-upload", color: 'green' }, { "title": "文件总数", "subTitle": "The Total Fils Number", "value": 2722, "icon": "el-icon-folder-opened", color: 'yellow' }, { "title": "医院总数", "subTitle": "The Hospital Number", "value": 1286, "icon": "el-icon-office-building", color: 'pink' }] }, "project": { "value": [{ "title": "转化率", "value": "13.16%", "img": "https://www.youbaobao.xyz/datav-res/success.png" }, { "title": "退单率", "value": "5.73%", "img": "https://www.youbaobao.xyz/datav-res/failed.png" }] } }
export default {
  data () {
    return {
      headerData: headerMockData.headerData.value
    }
  }
}


</script>

<style lang="scss" scoped>
.center-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgb(48, 48, 48);

  box-sizing: border-box;

  .center-header-wrapper {
    display: flex;
    width: 100%;
    .center-header-item {
      //flex: 1;
      display: flex;
      margin-left: 60px;
      width: 25%;
      .center-header-left {
        margin-top: 7px;
        .icon {
          font-size: 32px;
        }
        .green {
          color: #1de9b6;
        }
        .blue {
          color: #37a2da;
        }
        .pink {
          color: pink;
        }
        .yellow {
          color: yellow;
        }
      }

      .center-header-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 10px;
        width: 280px;
        color: white;
        .title {
          font-size: 16px;
        }

        .sub-title {
          font-size: 12px;
          letter-spacing: 1px;
          color: gray;
          margin-top: 2px;
        }

        .total {
          //font-family: DIN;
          font-size: 26px;
          //font-weight: bolder;
          // letter-spacing: 2px;
          margin-top: 10px;
        }
      }
    }
  }

  /* .project-wrapper {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .project {
      display: flex;
      flex-direction: column;
      align-items: center;

      .project-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 90px;
      }

      img {
        width: 100%;
        height: 100%;
      }

      .project-text {
        font-size: 18px;
        margin-top: 10px;
      }

      .project-value {
        font-size: 28px;
        font-weight: 700;
        margin-top: 5px;
      }
    }
  } */
}
</style>