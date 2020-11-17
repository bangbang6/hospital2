<template>
  <div class="chat-wrapper-w">
    <div class="chart-wrapper">
      <v-chart :options="categoryOptions" />
    </div>
    <div class="chart-wrapper">
      <v-chart :options="categoryOptions2" />
    </div>
  </div>
</template>

<script>

const mockData = [
  {
    legondname: "呼吸科",
    value: 67,
    percent: "15.40%",
    itemStyle: {
      color: '#1de9b6'
    },
    name: "呼吸科 | 15.4%"
  },
  {
    legondname: "心脏科",
    value: 97,
    percent: "22.30%",
    itemStyle: {
      color: '#37a2da'
    },
    name: "心脏科 | 22.30%",

  },
  {
    legondname: "内脏科",
    value: 92,
    percent: "21.15%",
    itemStyle: {
      color: 'pink'
    },
    name: "心脏科 | 21.15%"

  },
  {
    legondname: "消化科",
    value: 204,
    percent: "41.15%",
    itemStyle: {
      color: 'yellow'
    },
    name: "消化科 | 41.15%"

  },
]
const mockData2 = [
  {
    legondname: "北京",
    value: 67,
    percent: "15.40%",
    itemStyle: {
      color: '#1de9b6'
    },
    name: "北京 | 15.4%"
  },
  {
    legondname: "上海",
    value: 97,
    percent: "22.30%",
    itemStyle: {
      color: '#37a2da'
    },
    name: "上海 | 22.30%",

  },
  {
    legondname: "广东",
    value: 92,
    percent: "21.15%",
    itemStyle: {
      color: 'pink'
    },
    name: "广东 | 21.15%"

  },
  {
    legondname: "江西",
    value: 204,
    percent: "41.15%",
    itemStyle: {
      color: 'yellow'
    },
    name: "江西 | 41.15%"

  },
]
export default {
  data () {
    return {
      categoryOptions: {},
      categoryOptions2: {}
    }

  },
  mounted () {
    this.renderPieChart()
  },
  methods: {
    renderPieChart () {
      this.categoryOptions = {
        title: [/* {
          text: "文件分布",
          textStyle: {
            fontSize: 14,
            color: 'white',
          },
          left: 20,
          top: 20
        }, */ {
            text: "文件分布",

            x: "34.5%",
            y: "42.5%",
            textAlign: 'center',
            textStyle: {
              fontSize: 14,
              color: 'white',
              fontWeight: 'normal'
            }
          }],
        series: [{
          name: "category",
          type: 'pie',
          data: mockData,
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter: function (params) {
                return params.data.legondname
              }
            }
          },
          center: ["35%", "50%"],
          radius: ['45%', '60%'],
          labelLine: {
            normal: {
              length: 5,
              length2: 3,
              smooth: true
            }
          },
          /* itemStyle: {
            borderWidth:4px
          }, */
          clockwise: true
        }],
        legend: {
          type: 'scroll',
          orient: "vertical",
          height: 250,
          left: '60%',
          top: 'middle',
          textStyle: {
            color: "white"
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const str = params.seriesName + '</br>' + params.marker + params.data.legondname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
            return str
          }
        }
      }
      this.categoryOptions2 = {
        title: [/* {
          text: "文件分布",
          textStyle: {
            fontSize: 14,
            color: 'white',
          },
          left: 20,
          top: 20
        }, */ {
            text: "地区排行",

            x: "34.5%",
            y: "42.5%",
            textAlign: 'center',
            textStyle: {
              fontSize: 14,
              color: 'white',
              fontWeight: 'normal'
            }
          }],
        series: [{
          name: "area",
          type: 'pie',
          data: mockData2,
          label: {
            normal: {
              show: true,
              position: 'outter',
              formatter: function (params) {
                return params.data.legondname
              }
            }
          },
          center: ["35%", "50%"],
          radius: ['45%', '60%'],
          labelLine: {
            normal: {
              length: 5,
              length2: 3,
              smooth: true
            }
          },
          /* itemStyle: {
            borderWidth:4px
          }, */
          clockwise: true
        }],
        legend: {
          type: 'scroll',
          orient: "vertical",
          height: 250,
          left: '60%',
          top: 'middle',
          textStyle: {
            color: "white"
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const str = params.seriesName + '</br>' + params.marker + params.data.legondname + '</br>' + "数量: " + params.data.value + "</br>" + "占比:" + params.data.percent
            return str
          }
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.chat-wrapper-w {
  width: 60%;
  height: 100%;
  background: rgb(48, 48, 48);
  display: flex;
  float: left;
}
.chart-wrapper {
  width: 50%;
  height: 100%;
  background: rgb(48, 48, 48);
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>