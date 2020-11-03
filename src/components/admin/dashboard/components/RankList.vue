<template>
  <div class="rank">
    <h4 class="title">{{ title }}</h4>
    <ul class="list">
      <li v-for="(item, index) in list" :key="index">
        <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.credits }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RankList',
  // ['title', 'list']
  data() {
    return {
      title: '积分排名',
      list: [
        { name: '赵医生', credits: 1000, hospital: '协和医院' },
        { name: '钱医生', credits: 900, hospital: '协和医院' },
        { name: '孙医生', credits: 800, hospital: '协和医院' },
        { name: '李医生', credits: 700, hospital: '协和医院' },
        { name: '周医生', credits: 600, hospital: '协和医院' },
        { name: '武医生', credits: 500, hospital: '协和医院' },
        { name: '郑医生', credits: 400, hospital: '协和医院' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

  .rank {
    padding: 1px 32px 48px 36px;
    background: rgb(255, 255, 255);

    .list {
      margin: 25px 0 0;
      padding: 0;
      list-style: none;

      li {
        margin-top: 16px;

        span {
          color: rgba(0, 0, 0, .65);
          font-size: 14px;
          line-height: 22px;

          &:first-child {
            background-color: #f5f5f5;
            border-radius: 20px;
            display: inline-block;
            font-size: 12px;
            font-weight: 600;
            margin-right: 24px;
            height: 20px;
            line-height: 20px;
            width: 20px;
            text-align: center;
          }
          &.active {
            background-color: #314659;
            color: #fff;
          }
          &:last-child {
            float: right;
          }
        }
      }
    }
  }

  .mobile .rank {
    padding: 0 32px 32px 32px;
  }

</style>
