<template>
  <div class="yujian" @click="clear">
    <div class="authors">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">push权限</div>
      </div>
      <el-table :data="pushs" size="mini" @cell-click="click">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="用户" prop="userName">
          <template slot-scope="scope">
            <div
              v-if="scope.row[scope.column.property].status || scope.row.isList"
            >{{scope.row.userName.label}}</div>
            <el-select
              v-model="scope.row.userName.id"
              placeholder="请选择"
              v-else
              @change="e=>change(scope,users,e)"
            >
              <el-option v-for="item in users" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="文件" prop="fileName">
          <template slot-scope="scope">
            <div
              v-if="scope.row[scope.column.property].status || scope.row.isList"
            >{{scope.row.fileName.label}}</div>
            <el-select
              v-model="scope.row.fileName.id"
              placeholder="请选择"
              v-else
              @change="e=>change(scope,files,e)"
            >
              <el-option v-for="item in files" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="目标医院" prop="hospital">
          <template slot-scope="scope">
            <div v-if="scope.row.hospital.status|| scope.row.isList">{{scope.row.hospital.label}}</div>
            <el-select
              v-model="scope.row.channel.id"
              placeholder="请选择"
              v-else
              @change="e=>change(scope,hospitals,e)"
            >
              <el-option
                v-for="item in hospitals"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="目标通道" prop="channel">
          <template slot-scope="scope">
            <span v-if=" scope.row.isList">{{scope.row.channel.label}}</span>
            <span v-else>{{hospitalToChannel(scope.row.hospital.label)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="...">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              v-if="scope.row.isList"
              @click="deleteFile(scope.$index)"
            >删除</el-button>
            <el-button type="primary" size="mini" v-else @click="submit(scope.$index)">提交</el-button>
          </template>
        </el-table-column>

        <template slot="append">
          <div class="append" @click="add">
            <div class="add">+</div>
          </div>
        </template>
      </el-table>
    </div>
  </div>
</template>
 
<script>
import { getGroupedDataList, getGroupedUserList, addPushAuthority, getPushAuthorityList, deletePushAuthority } from '../../../api/admin'
import { getAllChannels } from '../../../api/channel'
export default {
  data () {
    return {
      pushs: [],
      users: [],
      channels: [],
      files: [],
      options: [],
      hospitals: []
    }
  },
  methods: {
    hospitalToChannel (hospital) {
      let name = ''
      this.channelMap.forEach((item) => {
        console.log('item', item);
        console.log('hospital', hospital);
        if (item.hospitalName == hospital) {
          name = item.channelName
        }
      })
      return name
    },
    change (scope, obj, e) {
      console.log('e', e);
      console.log('obj', obj);
      scope.row[scope.column.property].label = this.findLabelByObj(obj, e)
      console.log(' scope.row[scope.column.property].label', scope.row[scope.column.property].label);
    },
    findLabelByObj (obj, id) {
      let label
      obj.forEach((item) => {
        if (item.id === id) {
          label = item.label || item.channelName
          return
        }
      })
      return label
    },
    submit (index) {
      console.log('this.pushs[index]', this.pushs[index]);
      addPushAuthority(this.pushs[index].channel.id, this.pushs[index].fileName.id, this.pushs[index].userName.id).then(res => {
        if (res.data.code === 200) {
          alert('成功')
          getPushAuthorityList().then(res => {
            if (res.data.code === 200) {
              this.parse(res.data.data)
            } else {
              alert(res.data.message)
            }
          })
        } else {
          alert(res.data.message)
        }
      }, reject => {
        alert(reject)
      })

    },
    deleteFile (index) {
      console.log('this.pushs[index]', this.pushs[index]);
      deletePushAuthority(this.pushs[index].channel.id, this.pushs[index].fileName.id, this.pushs[index].userName.id).then(res => {
        if (res.data.code === 200) {
          alert('成功')
          getPushAuthorityList().then(res => {
            if (res.data.code === 200) {
              this.parse(res.data.data)
            } else {
              alert(res.data.message)
            }
          })
        } else {
          alert(res.data.message)
        }
      }, reject => {
        alert(reject)
      })
    },
    clear () {

      this.pushs.forEach(item => {
        for (let key in item) {
          if (key === 'isList') {
            continue
          }
          else item[key].status = true
        }
      })
    },
    click (row, column, cell, event) {
      console.log('row', row, column);
      this.pushs.forEach(item => {
        for (let key in item) {
          if (key === 'isList') {
            continue
          }
          else item[key].status = true
        }
      })
      row[column.property] && (row[column.property].status = false)
      event.stopPropagation()
    },
    add () {

      this.pushs.push({ userName: { label: "", status: true, id: "" }, fileName: { label: "", status: true, id: "" }, channel: { label: "", status: true, id: "" }, hospital: { label: "", status: true, id: "" }, isList: false })
    },
    parseObject (obj, note) {
      let res = []
      for (let key in obj) {
        /* let id = (key.match(/id=([0-9]){1,2}/))[1] */
        let channelname = (key.match(/channelName=(\w+),/))[1]
        let hospitalName = this.channelMap.filter(item => {
          return item.channelName === channelname

        })[0].hospitalName
        res.push(...(obj[key].map(item => ({
          ...item,
          channelName: channelname,
          label: hospitalName + '/' + item[note],
          value: item.id
        }))))

      }
      return res
    },
    parse (obj) {
      if (!obj) {
        this.pushs = { userName: { label: "", status: true, id: "" }, fileName: { label: "", status: true, id: "" }, channel: { label: "", status: true, id: "" }, hospital: { label: "", status: true, id: "" }, isList: false }
        return
      }
      this.pushs = obj.map(item => ({
        userName: { label: item.userHospitalName + "/" + item.username, status: true, id: item.userId }, fileName: { label: item.dataHospitalName + "/" + item.dataName, status: true, id: item.dataId }, channel: { label: item.channelName, status: true, id: item.channelId }, hospital: { label: item.hospitalName, status: true, id: item.channelId }, isList: true
      }
      ))
    }

  },
  mounted () {
    getPushAuthorityList().then(res => {
      if (res.data.code === 200) {
        this.parse(res.data.data)
      } else {
        alert(res.data.message)
      }
    })

    Promise.all([getAllChannels(), getGroupedDataList(), getGroupedUserList()]).then(res => {
      console.log('res', res);
      this.channelMap = res[0].data.data
      this.channels = this.channelMap.map(item => ({ label: item.channelName, id: item.id }))
      this.hospitals = this.channelMap.map(item => ({ label: item.hospitalName, id: item.id }))
      this.files = this.parseObject(res[1].data.data, 'dataName')
      this.users = this.parseObject(res[2].data.data, 'username')
      this.channels = res[2].data.data
      console.log('this.files', this.files);
      console.log('this.users', this.users);
      console.log('this.channels', this.channels);
    })

  },



}
</script>
 
<style lang="scss" scoped>
.yujian {
  height: 100%;
  width: 100%;
  .authors {
    width: 50%;
    margin-left: 25%;
    margin-top: 40px;
  }
}
.authors {
  width: 50%;
  margin-left: 25%;
  margin-top: 40px;
}
</style>
<style scoped lang='scss'>
.append {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .add {
    font-size: 24px;
    color: rgb(64, 158, 255);
  }
}
</style>
<style>
.el-table--enable-row-hover .el-table__body tr td:nth-child(4) div div {
  visibility: visible !important;
}
.el-input__inner {
  height: 30px !important;
}
</style>