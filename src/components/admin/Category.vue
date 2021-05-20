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
    legondname: "耳鼻喉科",
    value: 97,
    percent: "21.15%",
    itemStyle: {
      color: '#49a7f8'
    },
    name: "耳鼻喉科 | 21.15%",

  },

  {
    legondname: "口腔科",
    value: 67,
    percent: "22.30%",
    itemStyle: {
      color: '#236fff'
    },
    name: "口腔科 | 22.30%"
  },

  {
    legondname: "放射科",
    value: 92,
    percent: "15.4%",
    itemStyle: {
      color: '#9c00ff'
    },
    name: "放射科 | 15.4%"

  },
  {
    legondname: "皮肤科",
    value: 204,
    percent: "41.15%",
    itemStyle: {
      color: '#74fbf5'
    },
    name: "皮肤科 | 41.15%"

  },
]
const mockData2 = [
  {
    legondname: "武汉",
    value: 204,
    percent: "41.5%",
    itemStyle: {
      color: '#74fbf5'
    },
    name: "武汉 | 41.5%"
  },
  {
    legondname: "上海",
    value: 97,
    percent: "22.30%",
    itemStyle: {
      color: '#49a7f8'
    },
    name: "上海 | 22.30%",

  },
  {
    legondname: "广东",
    value: 92,
    percent: "21.15%",
    itemStyle: {
      color: '#9c00ff'
    },
    name: "广东 | 21.15%"

  },
  {
    legondname: "北京",
    value: 67,
    percent: "15.4%",
    itemStyle: {
      color: '#236fff'
    },
    name: "北京 | 15.4%"

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

            x: "44.5%",
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
          center: ["45%", "50%"],
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
        /* legend: {
          type: 'scroll',
          orient: "vertical",
          height: 250,
          left: '60%',
          top: 'middle',
          textStyle: {
            color: "white"
          }
        }, */
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

            x: "44.5%",
            y: "42.5%",
            textAlign: 'center',
            textStyle: {
              fontSize: 14,
              color: 'white',
              fontWeight: 'normal'
            }
          }],
        /* grid: {
          left: '10%',
          right: 0,
          top: 0,
          bottom: 0
        }, */
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
          center: ["45%", "50%"],
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
        /*  legend: {
           type: 'scroll',
           orient: "vertical",
           height: 250,
           left: '60%',
           top: 'middle',
           textStyle: {
             color: "white"
           }
         }, */
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
  width: 100%;
  height: 100%;
  background: rgb(48, 48, 48);
  display: flex;
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