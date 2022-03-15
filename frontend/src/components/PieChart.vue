<template>
  <ECharts class="chart" :option="pieOptions" />
</template>

<script lang="ts" setup>
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';

import {ref, defineProps} from 'vue';

interface Props {
  seriesData: any,
  seriesRadius?: any,
  seriesCenter?: any,
  titleText?: string,
  seriesFormatter?: string,
}

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

const props = withDefaults(defineProps<Props>(), {
  seriesData: [],
  seriesRadius: ['40%', '60%'],
  seriesCenter: ['50%', '60%'],
  titleText: '',
  seriesFormatter: '{a} <br/>{b} : {c} ({d}%)',
}) ;

const pieOptions = ref({
  title: {
    text: props.titleText,
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: props.seriesFormatter
  },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left',
  //   data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines', 'Directs', 'Emails', 'Ad Networkss', 'Video Adss', 'Search Enginess']
  // },
  series: [
    {
      name: props.titleText,
      type: 'pie',
      radius: props.seriesRadius,
      center: props.seriesCenter,
      data: props.seriesData,

      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

</script>

<style scoped>
.chart {
  height: 250px;
  width: 100%;
}
</style>
