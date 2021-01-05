<template>
  <div>
    <div class="channel">
      <el-radio-group v-model="channel">
        <el-radio-button
          class="channel-btn"
          v-for="item in channels"
          :key="item.id"
          :label="item.channelName"
          size="sm"
        ></el-radio-button>
      </el-radio-group>
    </div>
    <el-upload
      class="upload-demo"
      ref="upload"
      drag
      :action="action"
      multiple
      :http-request="uploadFile"
      :on-remove="handleRemove"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <div v-loading="loading" style="marginTop:20px"></div>
  </div>
</template>

<script>

import { upload } from '@/api/file'
import { mapState } from 'vuex';
import { checkChannel } from '@/api/channel'
export default {
  data () {
    return {
      action: '',
      loading: false,
      channels: [],
      channel: 'channel1'
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    uploadFile: function (param) {
      //let loadingInstance = this.$loading({ target: dom });
      const channelId = this.channels.filter((item) => {
        return item.channelName === this.channel
      })[0].id
      console.log(channelId);
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      let userId = -1
      this.loading = true
      if (!this.channel) {
        alert('请先选择通道')
        return
      }
      //formData.append("originUserId", userId);
      upload(formData, channelId).then((res) => {
        console.log('file', res);
        if (res.data.code === 200) {
          this.loading = false
        } else {
          alert(res.data.message)
        }
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
      this.loading = false

      this.$refs.upload.abort(file);
    },


  },
  mounted () {
    checkChannel().then(res => {
      if (res.data.code === 200) {
        this.channels = res.data.data
      }
    })
  }
}
</script>

<style scoped lang='scss'>
.channel {
  width: 100%;
  margin: 40px 0;
  .channel-btn {
    margin-right: 20px;
  }
}
</style>