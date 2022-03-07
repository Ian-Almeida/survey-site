<template>
  <q-page class="q-gutter-lg q-pa-md">
    <div class="row">
      <div class="col">
        <q-table
          title="Categorias disponíveis"
          :rows="categoryItems"
          :columns="headers"
          :filter="filter"
          :loading="loading"
          row-key="title"
          no-data-label="Não há registros de categorias"
          selection="multiple"
          v-model:selected="selectedItems"
        >
          <template v-slot:top>
            <q-btn color="primary" :disable="loading" label="Adicionar" @click="createDialog = true" flat />
            <q-toggle  label="Modo remover" v-model="removeMode"/>
            <q-btn
              class="q-ml-md"
              v-if="removeMode"
              color="accent"
              :disable="loading || selectedItems.length <= 0"
              label="remover"
              @click="removeItems"
              flat
            />
            <q-space />
            <q-input borderless dense debounce="300" color="primary" v-model="filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template #body-selection v-if="!removeMode">

          </template>

          <template #header-selection v-if="!removeMode">

          </template>

          <template #body-cell-color="props">
            <q-td key="color" :props="props">
              <q-chip :color="props.row.color" :style="{background: `${props.row.color}`, width: '50px'}"></q-chip>
            </q-td>
          </template>

          <template v-slot:no-data="{ icon, message, filter }">
            <div class="full-width row flex-center text-accent q-gutter-sm">
              <span>
            {{ message }}
          </span>
              <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="createDialog" persistent>
      <q-card style="min-width: 350px">

        <q-card-section>
          <div class="text-h5">Adicionar Categoria</div>
        </q-card-section>

        <q-card-section>
          <div class="row">
            <div class="col">
              <q-input v-model="addTitle" label="Título" />
            </div>
          </div>
          <div class="row">
            <div class="col flex justify-between">
              <q-input
                :model-value="addPickedColor"
                class="my-input"
                readonly
                borderless

                label="Cor"
              >
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-color
                        v-model="addPickedColor"
                        default-value="#285de0"
                        style="max-width: 250px"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="q-ma-md q-ml-md" :style="{width: '30px', height: '30px', background: `${addPickedColor}`, borderRadius: '25px'}">

              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup @click="cancelCreateCategory"/>
          <q-btn flat label="Confirmar" v-close-popup @click="confirmCreateCategory"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>

import {ICategory} from 'src/interfaces/ICategory';
import {computed, onBeforeMount, ref, watch} from 'vue';
import _ from 'lodash';
import {useCategoryStore} from 'src/pinia/category';

const categoryStore = useCategoryStore();

const loading = ref(false);
const createDialog = ref(false);
const removeMode = ref(false);
const filter = ref('');
const addPickedColor = ref('');
const addTitle = ref('');

const selectedItems = ref([]);

const categoryItems = computed(() => {
  return categoryStore.categories;
})


const headers = [
  {
    name: 'title',
    required: true,
    align: 'center',
    field: (row: ICategory) => row.title,
    format: (val: string) => `${val}`,
    label: 'Título'
  },
  {
    name: 'color',
    required: true,
    align: 'center',
    field: (row: ICategory) => row.color,
    format: (val: string) => `${val}`,
    label: 'Cor'
  },
];

function removeItems() {
  loading.value = true;
  _.forEach(selectedItems.value, (val) => {
    const removed = _.remove(categoryItems.value, (item) => item === val);
    void categoryStore.removeCategory(removed[0]._id);
  });
  selectedItems.value = [];

  removeMode.value = false;
  loading.value = false;
}

function cancelCreateCategory() {
  addPickedColor.value = '';
  addTitle.value = '';
}

async function confirmCreateCategory() {
  loading.value = true;
  const createdCategory = await categoryStore.createCategory({title: addTitle.value, color: addPickedColor.value});
  if (createdCategory) {
    categoryItems.value.push(createdCategory);
  }

  addPickedColor.value = '';
  addTitle.value = '';
  loading.value = false;
}

watch(removeMode, (val: boolean) => {
  if (!val) {
    selectedItems.value = [];
  }
})

onBeforeMount(async() => {
  await categoryStore.getAllCategories();
})

</script>

<style scoped>

</style>
