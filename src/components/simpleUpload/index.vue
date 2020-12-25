<template>
  <el-upload class="upload-demo" drag :action="action" multiple :http-request="uploadFile">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>

import { upload } from '@/api/file'
import { mapState } from 'vuex';
export default {
  data () {
    return {
      action: ''
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    uploadFile: function (param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      let userId = -1
      //formData.append("originUserId", userId);
      upload(formData).then((res) => {
        console.log('file', res);
      })
    }
  }
}
</script>

<style>
</style>