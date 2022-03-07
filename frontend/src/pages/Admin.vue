<template>
  <q-page>
    <div class="row q-gutter-lg q-pa-md">
      <q-card class="col">

        <q-card-section>
          <PieChart :series-data="seriesData" title-text="Categorias"/>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Gerenciar</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="col">

        <q-card-section>
          <PieChart :series-data="seriesData" title-text="Respostas"/>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Examinar</q-btn>
        </q-card-actions>
      </q-card>
    </div>



    <div class="row q-gutter-lg q-pa-md">
      <q-card class="col">

        <q-card-section>
            <PieChart :series-data="seriesData" :title-text="'Questionários totais'"/>
        </q-card-section>

        <q-card-actions>
            <q-btn flat>Examinar</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="col">

        <q-card-section>
          <PieChart :series-data="seriesData" :title-text="'Questionários ativos'"/>
        </q-card-section>

        <q-card-actions>
            <q-btn flat>Examinar</q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <div class="row q-gutter-lg q-pa-md">
      <q-card class="col">
        <q-card-section>
          <div class="text-h6">Últimas respostas</div>
        </q-card-section>

        <q-card-section>
          <div>zezinho</div>
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script lang="ts" setup>
import PieChart from './../components/PieChart.vue';

const seriesData = [
  { value: 335, name: 'Direct', itemStyle: {color: '#123456'} },
  { value: 310, name: 'Email' },
  { value: 234, name: 'Ad Networks' },
  { value: 135, name: 'Video Ads' },
  { value: 1548, name: 'Search Engines' },
]

</script>

<style scoped>

</style>
