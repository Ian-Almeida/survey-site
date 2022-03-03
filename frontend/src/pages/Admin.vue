<template>
  <q-page>
    <div class="row q-gutter-lg q-pa-md">
      <q-card class="col">
<!--        <q-card-section>-->
<!--          <div class="text-h6">Categorias</div>-->
<!--          <div class="text-subtitle1">Numero de categorias</div>-->
<!--          <div class="text-subtitle1">Gráfico redondo com as categorias e suas cores numero no centro</div>-->
<!--          <div class="text-subtitle1">tooltipo com a legenda no hover do grafico</div>-->
<!--        </q-card-section>-->

        <q-card-section>
          <PieChart :series-data="seriesData" title-text="Categorias"/>
        </q-card-section>

        <q-card-actions>
          <q-btn flat>Gerenciar</q-btn>
        </q-card-actions>
      </q-card>

      <q-card class="col">
        <q-separator vertical style="position: absolute; left: 50%; height: 100%"/>
<!--        <q-card-section class="row q-gutter-sm">-->
<!--          <div class="col">-->
<!--            <div class="text-h6">Quantidade de questionarios ativos</div>-->
<!--            <div class="text-subtitle1">grafico redondo categorizado e numero total no centro</div>-->
<!--            <div class="text-subtitle2">tooltipo com a legenda no hover do grafico e quantidades individuais</div>-->
<!--          </div>-->

<!--          <div class="col q-ml-lg">-->
<!--            <div class="text-h6">Quantidade de questionarios totais</div>-->
<!--            <div class="text-subtitle1">grafico redondo e numero total no centro</div>-->
<!--            <div class="text-subtitle2">tooltipo com a legenda no hover do grafico e quantidades individuais</div>-->
<!--          </div>-->

<!--        </q-card-section>-->

        <q-card-section class="row q-gutter-sm">
          <div class="col">
            <PieChart :series-data="seriesData" :series-radius="['25%', '45%']" :title-text="'Questionários ativos'"/>
          </div>

          <div class="col q-ml-lg">
            <PieChart :series-data="seriesData" :series-radius="['25%', '45%']" :title-text="'Questionários totais'"/>
          </div>
        </q-card-section>

        <q-card-actions class="row q-gutter-sm">

          <div class="col">
            <q-btn flat>Examinar</q-btn>
          </div>

          <div class="col">
            <q-btn flat>Examinar</q-btn>
          </div>
        </q-card-actions>
      </q-card>


      <q-card class="col">
<!--        <q-card-section>-->
<!--          <div class="text-h6">Respostas</div>-->
<!--          <div class="text-subtitle1">Numero de respostas</div>-->
<!--          <div class="text-subtitle1">Gráfico redondo com a categoria das respostas e quantidade total no centro</div>-->
<!--          <div class="text-subtitle2">tooltipo com a legenda no hover do grafico e quantidades individuais</div>-->
<!--        </q-card-section>-->

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
  { value: 335, name: 'Directs' },
  { value: 310, name: 'Emails' },
  { value: 234, name: 'Ad Networkss' },
  { value: 135, name: 'Video Adss' },
  { value: 1200, name: 'Search Enginess' }
]

</script>

<style scoped>

</style>
