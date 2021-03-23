<template>
  <div class="yunei">
    <el-tabs type="border-card">
      <el-tab-pane label="通道管理">
        <Channel></Channel>
      </el-tab-pane>
      <el-tab-pane label="文件管理">
        <File></File>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
import File from '../Authorize'
import Channel from '../Channel'
export default {
  components: {
    Channel, File
  },
  data () {
    return {
    }
  }
}
</script>
 
<style lang="scss" scoped>
</style>