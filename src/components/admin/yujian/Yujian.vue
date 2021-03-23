<template>
  <div class="big">
    <yujian-pull></yujian-pull>

    <yujian-push></yujian-push>
  </div>
</template>
 
<script>
import YujianPull from './YujianPull'
import YujianPush from './YujianPush'
export default {
  components: {
    YujianPull, YujianPush
  },
  data () {
    return {
    }
  }
}
</script>
 
<style lang="scss" >
.title-wrapper {
  height: 50px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 5px;
  .line {
    background-color: rgb(64, 158, 255);
    height: 20px;
    width: 2px;
  }
  .title {
    margin-left: 5px;
  }
}
</style>