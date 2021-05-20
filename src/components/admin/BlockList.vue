<template>
  <div class="block-list">
    <div id="main"></div>
  </div>
</template>
 
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
    }
  },
  methods: {
    getVirtulData (year) {
      year = year || '2021';
      var date = +echarts.number.parseDate(year + '-01-01');
      var end = +echarts.number.parseDate((+year + 1) + '-01-01');
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 10000)
        ]);
      }
      return data;
    }
  },
  mounted () {
    let chartDom = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    this.option = {


      visualMap: {
        min: 0,
        max: 10000,
        type: 'piecewise',
        orient: 'horizontal',
        left: 'center',
        top: 65,
        show: false,


        color: ['#49a7f8', '#74fbf5', '#01a684']
      },
      calendar: {
        top: 40,
        left: 40,
        right: 0,
        bottom: 0,
        cellSize: ['auto', 13],
        range: '2021',
        itemStyle: {
          borderWidth: 0.5
        },

        yearLabel: { show: false },
        dayLabel: {
          color: 'gray'
        },
        monthLabel: {
          color: 'gray'
        },
      },

      /*  darkMode: true,
       backgroundColor: 'rgb(48, 48, 48)', */
      series: {

        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: this.getVirtulData(2021),
        label: true,
      }
    };
    myChart.setOption(this.option)
  }
}
</script>
 
<style lang="scss" scoped>
.block-list {
  width: 100%;
  height: 100%;
  #main {
    width: 100%;
    height: 100%;
    div {
      width: 100% !important;
    }
  }
}
</style>