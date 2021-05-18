<template>
  <ve-amap
    :settings="chartSettings"
    :tooltip="tooltip"
    :series="series"
    height="100%"
    :after-set-option-once="afterSet"
  ></ve-amap>
</template>
 
<script>
export default {
  name: 'GDMap',
  data () {


    return {

      chartSettings: {
        key: "723508a3369754233a578f36a4d3cf24",
        amap: {
          zoom: 18,
          center: [114.259652,30.579893],
          mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a',
          animateEnable: true
        },

      },
      series: [],
      tooltip: {

      }
    }
  },
  mounted () {
    let littleDotData = [
      {
        name: '信息中心',
        value: [114.259200, 30.579669, 10400]
      },
      {
        name: '科研室',
        value: [114.259611, 30.579288, 10300]
      },
      {
        name: '影像科',
        value: [114.260701,30.579595, 12300]
      },
      {
        name: '耳鼻喉科',
        value: [114.260502,30.579152, 14300]
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
    /* let map = echarts.init(document.getElementById('map'))
    map.on('click', (params) => {
      console.log('params', params);
    }) */
  },
  methods: {
    afterSet: function (echarts) {
      var amap = echarts.getModel().getComponent('amap').getAMap()
      console.log('amap', amap);
      amap.on('click', e => {
        console.log('e', e);
        //  this.chartSettings.amap.center = [e.lnglat.Q, e.lnglat.R]
        // this.chartSettings.amap = {
        //   zoom: 16,
        //   center: [e.lnglat.Q, e.lnglat.R],
        //   mapStyle: 'amap://styles/70cca3ae74038446da3e27b05ed7435a',
        // }
        // console.log('a', amap.getZoom());
        amap.setZoomAndCenter(20, [e.lnglat.R, e.lnglat.Q])
      })
    }
  }

}
</script>
 
<style lang="scss" scoped>
</style>