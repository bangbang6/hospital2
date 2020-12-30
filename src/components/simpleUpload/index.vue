<template>
  <div>
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
export default {
  data () {
    return {
      action: '',
      loading: false
    }
  },
  computed: {
    ...mapState(['userId'])
  },
  methods: {
    uploadFile: function (param) {

      //let loadingInstance = this.$loading({ target: dom });
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      let userId = -1
      this.loading = true

      //formData.append("originUserId", userId);
      upload(formData).then((res) => {
        console.log('file', res);
        this.loading = false
        //loadingInstance.close()
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
      this.loading = false

      this.$refs.upload.abort(file);
    },

  }
}
</script>

<style>
</style>