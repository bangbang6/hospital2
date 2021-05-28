<template>
  <div class="data-summary">
    <div class="head">
      <div :style="{fontWeight:'bold'}">联合计算中心-数据汇集</div>
      <el-button type="primary" size="mini" @click="$router.push('/admin/dashboard')">中心节点详情</el-button>
    </div>
    <el-card>
      <div class="options">
        <div class="left">
          <div class="date">
            <div class="key">上传时间:</div>
            <el-date-picker
              v-model="date"
              type="datetimerange"
              size="mini"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <div class="origin">
            <div class="key">数据来源:</div>
            <el-select v-model="originData" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="name">
            <div class="key">名称:</div>

            <el-input size="mini" v-model="dataName" clearable></el-input>
          </div>
        </div>

        <div class="right">
          <!-- <div class="radios">
            <el-radio-group v-model="sortItem" size="mini">
              <el-radio-button label="正序"></el-radio-button>
              <el-radio-button label="逆序"></el-radio-button>
            </el-radio-group>
          </div>-->
          <el-button size="mini" type="primary" @click="search">搜索</el-button>
          <el-button size="mini" type="primary">参与运算</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="数据集名称" width="140">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          label="数据集上传时间"
          width="240"
          show-overflow-tooltip
          sortable
          :sort-method="handleDateSort"
        >
          <template slot-scope="scope">{{ formateDate(scope.row.updateTime) }}</template>
        </el-table-column>
        <el-table-column
          prop="size"
          label="数据集大小"
          width="120"
          sortable
          :sort-method="handleSizeSort"
          :formatter="(row)=>row.size+'MB'"
        ></el-table-column>
        <el-table-column prop="blockNumber" label="区块链区块号"></el-table-column>
        <el-table-column prop="origin" label="数据集来源"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
export default {
  data () {
    return {
      tableData: [],
      allData: [//!修改数据
        {
          name: "Text008",
          updateTime: new Date('December 18, 1995 03:24:00'),
          size: 512,
          blockNumber: 'aufhoqefncalkca',
          origin: "北京大学第一医院"
        },
        {
          name: "Text008",
          updateTime: new Date('December 17, 1995 03:24:00'),

          size: 512,
          blockNumber: 'aufhoqefncalkca',
          origin: "北京大学第一医院"
        },
        {
          name: "Text008",
          updateTime: new Date('December 17, 1995 03:24:00'),

          size: 512,
          blockNumber: 'aufhoqefncalkca',
          origin: "北京大学第一医院"
        },
        {
          name: "Text008",
          updateTime: new Date('December 17, 1995 03:24:00'),

          size: 512,
          blockNumber: 'aufhoqefncalkca',
          origin: "北京大学第一医院"
        },
        {
          name: "Text008",
          updateTime: new Date('December 17, 1995 03:24:00'),

          size: 51,
          blockNumber: 'aufhoqefncalkca',
          origin: "北京大学第一医院"
        },
        {
          name: "Text008",
          updateTime: new Date('December 17, 1995 03:24:00'),

          size: 512,
          blockNumber: 'aufhoqefncalkca',
          origin: "北京大学第一医院"
        },
      ],
      date: "",
      originData: "",
      dataName: "",
      sortItem: "正序",
      options: [
        {
          value: 1,
          label: "北京大学第一医院"
        },
        {
          value: 2,
          label: "北京大学第三医院"
        },
        {
          value: 3,
          label: "西安交通大学第一附属医院"
        },
        {
          value: 4,
          label: "海南人民医院"
        },
        {
          value: 5,
          label: "武汉同济医院"
        },
      ]
    }
  },
  methods: {
    handleSelectionChange () {

    },
    formateDate (date) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' })
    },
    handleDateSort (a, b) {
      return a.updateTime.getTime() - b.updateTime.getTime()
    },
    handleSizeSort (a, b) {
      return a.size - b.size
    },
    search () {
      this.tableData = this.allData
      if (this.date && this.date.length) {
        console.log('this.date', this.date);
        this.tableData = this.tableData.filter(item => item.updateTime.getTime() >= this.date[0].getTime() && item.getTime() <= this.data[1].getTime())
      }
      if (this.originData) {
        console.log('this.originData', this.originData);
        this.tableData = this.tableData.filter(item => item.origin.indexOf(this.options[this.originData - 1].label) > -1)
      }
      if (this.dataName) {
        console.log('this.dataName', this.dataName);
        this.tableData = this.tableData.filter(item => item.name.indexOf(this.dataName) > -1)
      }
    }
  },
  mounted () {
    this.tableData = this.allData
  }
}
</script>
 
<style lang="scss" scoped>
.data-summary {
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  height: 100%;
  .head {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    box-sizing: border-box;
    height: 40px;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
  }
  .el-card {
    margin-top: 20px;
    height: calc(100% - 80px);
    .options {
      display: flex;
      margin-top: 10px;
      font-size: 14px;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;

        .date,
        .origin,
        .name {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .key {
            margin-right: 20px;
            font-weight: 600;
          }
        }
        .date {
          .el-date-editor {
            width: 320px;
          }
        }
        .origin {
          .el-select {
            width: 200px;
            /deep/ .el-input {
              width: 200px;
            }
          }
        }
        .name {
          .el-input {
            width: 120px;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .radios {
          display: flex;
          align-items: center;
          margin-right: 20px;
          .key {
            font-size: 14px;
            font-weight: 600;
            margin-right: 20px;
          }
        }
      }
    }
    .el-table {
      margin-top: 10px;
    }
  }
}
</style>