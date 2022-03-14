<template>
  <q-page>
    <div class="row q-gutter-lg q-pa-md">
      <q-card class="col">
        <div class="skeleton-container" v-if="loading">
          <q-skeleton height="100%" square />
        </div>

        <div v-else>
          <q-card-section>
            <PieChart series-formatter="{a} <br/><strong>{b}</strong>" :series-data="categoriesSeriesData" title-text="Categorias"/>
          </q-card-section>

          <q-card-actions>
            <q-btn flat to="category">Gerenciar</q-btn>
          </q-card-actions>
        </div>

      </q-card>

      <q-card class="col">

        <div class="skeleton-container" v-if="loading">
          <q-skeleton height="100%" square />
        </div>

        <div v-else>
          <q-card-section>
            <PieChart :series-data="seriesData" title-text="Respostas"/>
          </q-card-section>

          <q-card-actions>
            <q-btn flat>Examinar</q-btn>
          </q-card-actions>
        </div>

      </q-card>
    </div>



    <div class="row q-gutter-lg q-pa-md">
      <q-card class="col">

        <div class="skeleton-container" v-if="loading">
          <q-skeleton height="100%" square />
        </div>

        <div v-else>
          <q-card-section>
            <PieChart :series-data="seriesData" :title-text="'Questionários totais'"/>
          </q-card-section>

          <q-card-actions>
            <q-btn flat>Examinar</q-btn>
          </q-card-actions>
        </div>

      </q-card>

      <q-card class="col">

        <div class="skeleton-container" v-if="loading">
          <q-skeleton height="100%" square />
        </div>

        <div v-else>
          <q-card-section>
            <PieChart :series-data="seriesData" :title-text="'Questionários ativos'"/>
          </q-card-section>

          <q-card-actions>
            <q-btn flat>Examinar</q-btn>
          </q-card-actions>
        </div>

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
import {computed, onMounted, ref} from 'vue';
import {useCategoryStore} from 'src/pinia/category';
import _ from 'lodash';

const categoryStore = useCategoryStore();

const loading = ref(false);

const seriesData = [
  { value: 335, name: 'Direct', itemStyle: {color: '#123456'} },
  { value: 310, name: 'Email' },
  { value: 234, name: 'Ad Networks' },
  { value: 135, name: 'Video Ads' },
  { value: 1548, name: 'Search Engines' },
]

const categoriesSeriesData = computed(() => {
  return _.map(categoryStore.categories, (item) => {
    return {value: 1, name: item.title, itemStyle: {color: item.color}};
  })
})

onMounted(async () => {
  loading.value = true;
  await categoryStore.getAllCategories();
  loading.value = false;
})

</script>

<style scoped>
.skeleton-container {
  padding: 10px; width: 100%; height: 100%;
}

</style>
