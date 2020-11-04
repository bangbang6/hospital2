<!--
 * @Author: your name
 * @Date: 2020-11-04 10:39:05
 * @LastEditTime: 2020-11-04 10:39:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /hospital2/src/components/doctor/Upload.vue
-->
<template>
  <div class="main1" style="margin:20px;">
    <el-container direction="vertical" style="height:100%">
      <!-- <el-header></el-header> -->
      <el-header style="height:100%">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-exceed="handleExceed"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-upload
          ref="upload2"
          class="upload-demo1"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :auto-upload="false"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-upload" style="width:100%"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }, { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
      this.$refs.upload2.submit()
      this.$refs.upload.clearFiles()
      this.$refs.upload2.clearFiles()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed() {
      alert('超过最大允许上传文件数量！')
    }
  }
}
</script>
<style>
.main1 {
  width: 100%;
  height: 100%;
  
}
.upload-demo1 .el-upload--text{
  width: 100%;
  height: 100%;
}

.upload-demo1 .el-upload--text .el-upload-dragger{
    width: 100%
}
.el-header {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
