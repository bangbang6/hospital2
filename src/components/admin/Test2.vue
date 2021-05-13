<template>
  <ve-amap :settings="chartSettings" :tooltip="tooltip" :series="series" height="100%"></ve-amap>
</template>
 
<script>
export default {
  data () {
    this.chartSettings = {
      key: "723508a3369754233a578f36a4d3cf24",
      amap: {
        zoom: 16,
        center: [114.418071, 30.511844],
        mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a'
      }
    }
    return {

      series: [],
      tooltip: {

      }
    }
  },
  mounted () {
    let littleDotData = [
      {
        name: '南六楼',
        value: [114.413633, 30.509502, 10400]
      },
      {
        name: '东五楼',
        value: [114.418071, 30.511844, 20300]
      },
    ]
    this.series = [{
      type: 'effectScatter',
      data: littleDotData,
      coordinateSystem: 'amap',
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

}
</script>
 
<style lang="scss" scoped>
</style>