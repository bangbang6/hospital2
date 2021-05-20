<template>
  <div class="smooth-line">
    <div id="main2"></div>
  </div>
</template>
 
<script>
import echarts from 'echarts'
import axios from 'axios';
var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
export default {
  data () {
    return {
    }
  },
  mounted () {
    var chartDom = document.getElementById('main2');
    var myChart = echarts.init(chartDom);
    var option = {}
    myChart.showLoading();
    axios.get(ROOT_PATH + '/data/asset/data/confidence-band.json').then(data => {
      data = data.data
      myChart.hideLoading();

      var base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
      }, Infinity);
      myChart.setOption(option = {
        title: {

          subtext: 'Example in MetricsGraphics.js',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,

              color: '#222'
            }
          },
          formatter: function (params) {
            return params[2].name + '<br />' + ((params[2].value - base) * 100).toFixed(1) + '%';
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '2%',
          top: '30%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: data.map(function (item) {
            return item.date;
          }),
          axisLabel: {
            formatter: function (value, idx) {
              var date = new Date(value);
              return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
            }
          },
          boundaryGap: false
        },
        yAxis: {
          axisLabel: {
            formatter: function (val) {
              return (val - base) * 100 + '%';
            },
            color: 'gray'
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return ((params.value - base) * 100).toFixed(1) + '%';
              },

            }
          },
          splitNumber: 3
        },
        series: [{
          name: 'L',
          type: 'line',
          data: data.map(function (item) {
            return item.l + base;
          }),
          lineStyle: {
            opacity: 0
          },
          stack: 'confidence-band',
          symbol: 'none'
        }, {
          name: 'U',
          type: 'line',
          data: data.map(function (item) {
            return item.u - item.l;
          }),
          lineStyle: {
            opacity: 0
          },
          areaStyle: {
            color: '#ccc'
          },
          stack: 'confidence-band',
          symbol: 'none'
        }, {
          type: 'line',
          data: data.map(function (item) {
            return item.value + base;
          }),
          hoverAnimation: false,
          symbolSize: 6,
          itemStyle: {
            color: '#333'
          },
          showSymbol: false
        }]
      });
    })
  }
}
</script>
 
<style lang="scss" scoped>
.smooth-line {
  width: 100%;
  height: 100%;
  #main2 {
    width: 100%;
    height: 100%;
  }
}
</style>