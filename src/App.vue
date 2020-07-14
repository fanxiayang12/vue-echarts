<template>
  <div id="app">
    <v-chart class="v-chart" :options="polar" />
  </div>
</template>

<script>
import _ from "lodash";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar"
import "echarts/lib/component/polar";

export default {
  name: "app",
  data() {
    /*
        https://echarts.apache.org/examples/zh/editor.html?c=line-stack&theme=light

        1、数据
        2、样式
    */
    let title = "心内住院ASCVD超高危患者数分析（2019.10-2020.3）";
    let data = {
      x: ["2019/10", "2019/11", "2019/12", "2020/01", "2020/02", "2020/03"],
      y: {
        ASCVD超高危总数: {
          data: [244, 240, 221, 30, 13, 33],
        },
        "复发ASCVD（两年内≥2次）": {
          data: [185, 181, 161, 23, 9, 30],
        },
        "心、脑或外周多血管床AS": {
          data: [55, 79, 54, 11, 3, 7],
        },
        冠状动脉多支血管病变: {
          data: [23, 38, 28, 2, 1, 3],
        },
        "近期ACS（一年内）": {
          data: [212, 202, 176, 15, 11, 18],
        },
        "LDL-C≥4.9mmol/L": {
          data: [5, 5, 3, 0, 0, 0],
        },
        糖尿病: {
          data: [73, 71, 53, 15, 6, 10],
        },
      },
    };

    let legends = [];
    let series = [];
    for (let key in data.y) {
      series.push({
        name: key,
        type: "bar",
        // stack: '总量',
        data: data.y[key].data,
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
        },
      });
      legends.push(key);
    }

    var option = {
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: legends,
        orient: "vertical",
        right: 80,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        itemSize: 20,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: false, type: ["line", "bar"] },
          restore: { show: false },
          saveAsImage: { show: true },
        },
      },
      xAxis: {
        name: "时间",
        type: "category",
        boundaryGap: true,
        data: data.x,
      },
      yAxis: {
        name: "人数",
        type: "value",
      },
      series,
    };

    return {
      polar: option,
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app .echarts {
  align: center;
  width: 90%;
  height: 90%;
}
</style>
