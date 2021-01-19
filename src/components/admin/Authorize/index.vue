<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" class="table" size="mini">
      <el-table-column prop="userName" label="用户名" width="160"></el-table-column>
      <el-table-column prop="channelName" label="通道" width="160"></el-table-column>
      <el-table-column prop="dataName" label="文件名" width="300"></el-table-column>
      <el-table-column prop="authorSet" label="权限设置">
        <template slot-scope="scope">
          <el-checkbox-group
            v-model="checkLists[scope.$index]"
            :disabled="groupDisable"
            @change="(mes)=>{
            handleChange(mes,scope.$index)
          }"
            style="width:100%"
          >
            <el-checkbox label="预览"></el-checkbox>
            <el-checkbox label="修改"></el-checkbox>
            <el-checkbox label="删除"></el-checkbox>
            <!--  <el-checkbox label="溯源"></el-checkbox>
            <el-checkbox label="追踪"></el-checkbox>-->
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAuthority, addAuthority, deleteAuthority } from '@/api/admin'
import { removeToken } from '@/utils/cookie'
const dataMap = {
  "预览": 1,
  "修改": 2,
  "删除": 3,
  /* "溯源": 4,
  "追踪": 5, */
}
export default {
  data () {
    return {
      tableData: [],
      checkLists: [],
      checkListOld: [],
      groupDisable: false,
    }
  },
  methods: {

    handleChange (mes, index) {
      let handle
      this.groupDisable = true

      this.$confirm('确定执行这项操作嘛', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('this.checkListOld[index]', this.checkListOld[index]);
        if (mes.length > this.checkListOld[index].length) {

          console.log('增加权限');
          handle = mes.filter(item => {
            return this.checkListOld[index].indexOf(item) === -1
          })


          addAuthority(this.tableData[index].userId, this.tableData[index].fileId, dataMap[handle[0]]).then(res => {
            console.log('add', res);
            if (res.data.code === 200) {
              this.checkListOld[index].push(handle[0])
              console.log('200', this.checkListOld[index]);
            } else {
              alert(res.data.message)

              this.checkLists = [...this.checkListOld]
              console.log('400', this.checkListOld[index]);
            }
            this.groupDisable = false
            console.log('401', this.checkListOld[index]);

          })
        } else {
          console.log('删除权限');
          handle = this.checkListOld[index].filter(item => {
            return mes.indexOf(item) === -1
          })
          deleteAuthority(this.tableData[index].userId, this.tableData[index].fileId, dataMap[handle[0]]).then(res => {
            console.log('delete', res);
            if (res.data.code === 200) {
              this.checkListOld[index] = this.checkListOld[index].filter(item => item !== handle[0])
              console.log(this.checkListOld[index]);
            } else {
              alert(res.data.message)
              this.checkLists = [...this.checkListOld]

            }
            this.groupDisable = false
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
        this.checkLists = [...this.checkListOld]
        this.groupDisable = false
      });






    },
    parseLabel (set) {
      const contents = ['预览', '修改', '删除'/* , '溯源', '追踪' */]
      return set.map(item => {
        return contents[item - 1]
      })
    },
    parser (files) {

      return files.map((item, index) => {
        this.checkLists.push(this.parseLabel(item.dataAuthoritySet))
        this.checkListOld.push(this.parseLabel(item.dataAuthoritySet))
        return {
          userName: item.userName,
          userId: item.userId,
          fileId: item.dataId,
          dataName: item.dataName.split('/').slice(-1)[0],
          channelName: item.channelName,
          dataAuthoritySet: this.parseLabel(item.dataAuthoritySet)
        }

      })
    },

  },
  mounted () {
    getAuthority().then(res => {
      if (res.data.code === 200) {
        console.log(res.data);

        this.tableData = this.parser(res.data.data)
        console.log('first', this.checkLists);


      }
    })
  }
}
</script>

<style  scoped>
.el-table--enable-row-hover .el-table__body tr td:nth-child(4) div div {
  visibility: visible;
}
.user {
  width: 60px;
  height: 40px;
  margin-top: 10px;
  float: right;
  margin-right: 200px;
}

.imgAvaturl {
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
}
</style>
