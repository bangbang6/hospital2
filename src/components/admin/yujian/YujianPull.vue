<template>
  <div class="yujian" @click="clear">
    <div class="authors">
      <div class="title-wrapper">
        <div class="line"></div>
        <div class="title">pull权限</div>
      </div>
      <el-table :data="pulls" size="mini" @cell-click="click">
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
        <el-table-column label="通道" prop="channel">
          <template slot-scope="scope">
            <div
              v-if="scope.row[scope.column.property].status|| scope.row.isList"
            >{{scope.row.channel.label}}</div>
            <el-select
              v-model="scope.row.channel.id"
              placeholder="请选择"
              v-else
              @change="e=>change(scope,channels,e)"
            >
              <el-option
                v-for="item in channels"
                :key="item.id"
                :label="item.channelName"
                :value="item.id"
              ></el-option>
            </el-select>
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
import { getGroupedDataList, getGroupedUserList, addPullAuthority, getPullAuthorityList, deletePullAuthority } from '../../../api/admin'
import { getAllChannels } from '../../../api/channel'
export default {
  data () {
    return {
      pulls: [],
      users: [],
      channels: [],
      files: [],
      options: []
    }
  },
  methods: {
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
      console.log('this.pulls[index]', this.pulls[index]);
      addPullAuthority(this.pulls[index].channel.id, this.pulls[index].fileName.id, this.pulls[index].userName.id).then(res => {
        if (res.data.code === 200) {
          alert('成功')
          getPullAuthorityList().then(res => {
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

      deletePullAuthority(this.pulls[index].channel.id, this.pulls[index].fileName.id, this.pulls[index].userName.id).then(res => {
        if (res.data.code === 200) {
          alert('成功')
          getPullAuthorityList().then(res => {
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

      this.pulls.forEach(item => {
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
      this.pulls.forEach(item => {
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

      this.pulls.push({ userName: { label: "", status: true, id: "" }, fileName: { label: "", status: true, id: "" }, channel: { label: "", status: true, id: "" }, isList: false })
    },
    parseObject (obj, note) {
      let res = []
      for (let key in obj) {
        /* let id = (key.match(/id=([0-9]){1,2}/))[1] */
        let name = (key.match(/channelName=(\w+)\)/))[1]
        res.push(...(obj[key].map(item => ({
          ...item,
          channelName: name,
          label: name + '/' + item[note],
          value: item.id
        }))))

      }
      return res
    },
    parse (obj) {
      if (!obj) {
        this.pulls = { userName: { label: "", status: true, id: "" }, fileName: { label: "", status: true, id: "" }, channel: { label: "", status: true, id: "" }, isList: false }
        return
      }
      this.pulls = obj.map(item => ({
        userName: { label: item.username, status: true, id: item.userId }, fileName: { label: item.dataName, status: true, id: item.dataId }, channel: { label: item.channelName, status: true, id: item.channelId }, isList: true
      }
      ))
    }

  },
  mounted () {
    getPullAuthorityList().then(res => {
      if (res.data.code === 200) {
        this.parse(res.data.data)
      } else {
        alert(res.data.message)
      }
    })

    Promise.all([getGroupedDataList(), getGroupedUserList(), getAllChannels()]).then(res => {
      console.log('res', res);
      this.files = this.parseObject(res[0].data.data, 'dataName')
      this.users = this.parseObject(res[1].data.data, 'username')
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