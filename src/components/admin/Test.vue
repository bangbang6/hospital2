<template>
  <!-- <div class="loading" v-if="loading">加载中</div> -->
  <!--    <Vue-echarts :options="options" id="orderMap"></Vue-echarts> -->
  <div id="orderMap"></div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import VueEcharts from './VueEcharts.vue'

export default {
  data () {
    return {
      loading: true,
      options: { baseOptions: {} },
      publicPath: process.env.BASE_URL,

    }
  },
  components: { VueEcharts },
  mounted () {
    let mockData = [{
      center: [114.413633, 30.509502]
    }, {
      center: [114.418071, 30.511844]
    }]
    /*  this.getData() */
    var map = new AMap.Map('orderMap', {
      // viewMode: '3D',
      zoom: 16,
      center: [114.418071, 30.511844],
      /*  resizeEnable: false, */
      mapStyle: 'amap://styles/darkblue'
      /*  mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a' */
    })
    map.setMapStyle('amap://styles/70cca3ae74038446da3e27b05ed7435a');
    for (var i = 0; i < mockData.length; i += 1) {
      var center = mockData[i].center;
      var circleMarker = new AMap.CircleMarker({
        center: center,
        radius: 10,//3D视图下，CircleMarker半径不要超过64px
        strokeColor: 'white',
        strokeWeight: 2,
        strokeOpacity: 0.5,
        fillColor: 'rgba(0,0,255,1)',
        fillOpacity: 0.5,
        zIndex: 10,
        bubble: true,
        cursor: 'pointer',
        clickable: true
      })
      circleMarker.setMap(map)
      /*  circleMarker.setTitle('南六楼') */
    }
  },
  methods: {

    getData () {

      let that = this
      axios.get(`${this.publicPath}hust.json`).then(res => {
        console.log(res);
        echarts.registerMap('china', res.data)
        const barData = []
        const _options = {
          baseOption: {
            geo: { //geo表示自定义
              map: 'china',
              zoom: 1.1,
              roam: true,//可交互
              /*  scaleLimit: {
                 min: 0.5,
                 max: 3
               },//放大缩小比例 */
              center: [10.83531246, 34.0267395887],
              itemStyle: { //每一块元素
                normal: {
                  borderColor: 'rgba(147, 235, 248, 1)',
                  borderWidth: 2,

                  areaColor: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                      offset: 0, color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                    }, {
                      offset: 1, color: 'rgba(147, 235, 248, 0.2)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  },
                  shadowColor: 'rgba(128,217,248,1)',
                  shadowOffsetX: -2,
                  shadowOffsetY: 2,
                  shadowBlur: 10
                },
                emphasis: {
                  areaColor: '#389BB7',
                  borderWidth: 0,

                }

              },
              label: { //标签显示
                emphasis: {
                  show: false
                }
              }
            }
          },

        }

        /* _options.options.push({
          backgroundColor: 'rgb(48, 48, 48)',
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: citys
          },
          series: [{
            type: 'bar',
            data: [0, 0, 0.5, 0.8, 0.9, 1.3, 1.5, 5]
          }]
        }) */

        that.options = _options
        that.loading = false


        that.options.baseOption = {
          ...that.options.baseOption,
          series: [{
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: that.littleDotData,
            symbolSize: function (val) {
              return val[2] / 1000
            },

            rippleEffect: {

              brushType: "stroke", //涟漪
            },
            hoverAnimation: true,//移上去有动画
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter (params) {
                  return params.data.name
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#74fbf5',/* colors[0][0], */
                shodowColor: '#74fbf5' /* colors[0][0] */
              }
            }
          }]

        }

      })








    },


  }
}
</script>
 
<style lang="scss" scoped>
#orderMap {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>