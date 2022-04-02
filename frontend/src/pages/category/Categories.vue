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
          :selected-rows-label="(numberOfRows) => numberOfRows > 1 ? `${numberOfRows} registros selecionados` : `${numberOfRows} registro selecionado`"
          rows-per-page-label="Registros por página: "
          :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`"
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

          <template #body-cell-actions="props">
            <q-td key="actions" :props="props">
              <q-icon class="cursor-pointer" name="edit" size="sm" @click="onClickEditar(props.row)">
                <q-tooltip>Editar</q-tooltip>
              </q-icon>
            </q-td>
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
          <div class="text-h5">{{ !isEditing ? 'Adicionar Categoria' : 'Editar Categoria' }}</div>
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
          <q-btn flat label="Voltar" color="secondary" v-close-popup @click="cancelCreateCategory"/>
          <q-btn flat label="Confirmar" v-close-popup @click="confirmChangeCategory"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>

import {ICategory, ICategoryUpdate} from 'src/interfaces/ICategory';
import {computed, onBeforeMount, ref, watch} from 'vue';
import _ from 'lodash';
import {useCategoryStore} from 'src/pinia/category';
import {useQuasar} from 'quasar';

const categoryStore = useCategoryStore();
const $q = useQuasar();

const loading = ref(false);
const isEditing = ref(false);
const toEditId = ref('');
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
  {
    name: 'actions',
    required: true,
    align: 'center',
    label: 'Ações'
  },
];

function removeItems() {
  loading.value = true;
  $q.dialog({
    title: 'Confirmar',
    message: 'Gostaria de remover os itens selecionados?',
    ok: {
      push: true,
      color: 'primary',
      flat: true,
      label: 'Sim',
    },
    cancel: {
      push: true,
      color: 'negative',
      flat: true,
      label: 'Não',
    },
    persistent: true
  }).onOk(() => {
    _.forEach(selectedItems.value, (val) => {
      const removed = _.remove(categoryItems.value, (item) => item === val);
      void categoryStore.removeCategory(removed[0]._id);
    });
    selectedItems.value = [];
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
    removeMode.value = false;
    loading.value = false;
  })
}

function cancelCreateCategory() {
  addPickedColor.value = '';
  addTitle.value = '';
  isEditing.value = false;
  toEditId.value = '';
}

async function confirmChangeCategory() {
  loading.value = true;
  if (isEditing.value) {
    const toUpdate: ICategoryUpdate = {
      color: addPickedColor.value,
      title: addTitle.value,
    }

    const updated = await categoryStore.updateCategory({_id: toEditId.value, categoryIn: toUpdate});
    if (updated) {
      const index = _.findIndex(categoryItems.value, (item) => item._id === updated._id);
      categoryItems.value[index] = updated;
    }

  } else {
    const createdCategory = await categoryStore.createCategory({title: addTitle.value, color: addPickedColor.value});
    if (createdCategory) {
      categoryItems.value.push(createdCategory);
    }

    addPickedColor.value = '';
    addTitle.value = '';
  }

  isEditing.value = false;
  toEditId.value = '';
  loading.value = false;
}

function onClickEditar(item: ICategory) {
  isEditing.value = true;
  createDialog.value = true;
  toEditId.value = item._id;
  addPickedColor.value = item.color;
  addTitle.value = item.title;
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
