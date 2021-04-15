<template>
  <div class="upload-wrapper">
    <div class="upload">
      <div class="channel">
        <el-radio-group v-model="channel">
          <el-radio-button class="channel-btn" label="同济医院" size="sm"></el-radio-button>
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
    <el-card class="message">
      <div slot="header" class="clearfix">
        <span :style="{fontWeight:'bold'}">上传文件信息</span>
      </div>
      <div class="info">
        <span class="key">文件名:</span>
        <span class="value">文件名</span>
      </div>
      <div class="info">
        <span class="key">文件名:</span>
        <span class="value">文件名</span>
      </div>
      <div class="info">
        <span class="key">文件名:</span>
        <span class="value">文件名</span>
      </div>
      <div class="info">
        <span class="key">文件名:</span>
        <span class="value">文件名</span>
      </div>
    </el-card>
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
      channel: '同济医院'
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    uploadFile: function (param) {
      //let loadingInstance = this.$loading({ target: dom });
      if (!this.channels.length) {
        alert('无可用通道,无法上传到服务器')
        return
      }

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
          alert(res.data.message)
        } else {
          alert(res.data.message)
          this.loading = false
        }
      }, err => {
        alert(err.message)
        this.loading = false
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
      this.loading = false

      this.$refs.upload.abort(file);
    },


  },
  mounted () {
    /* checkChannel().then(res => {
      if (res.data.code === 200) {
        this.channels = res.data.data

      }
    }) */
  }
}
</script>

<style scoped lang='scss'>
.upload-wrapper {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .upload {
    width: 40%;
    height: 100%;

    .channel {
      width: 100%;
      margin: 40px 0;
      .channel-btn {
        margin-right: 20px;
      }
    }
  }
  .message {
    width: 40%;
    height: 100%;
    margin-top: 50px;
    height: 80%;
    background: white;
    .info {
      width: 100%;
      height: 20px;
      color: black;
      font-size: 14px;

      padding: 20px;
      box-sizing: border-box;

      .key {
        display: inline-block;
        width: 60px;
      }
    }
  }
}
</style>