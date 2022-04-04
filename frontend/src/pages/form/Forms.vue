<template>
  <q-page class="q-gutter-lg q-pa-md">
    <div class="row">
      <div class="col">
        <div style="display: flex; flex-direction: column; width: 100%; height: 100%; align-items: center">
          <q-btn
            style="max-width: 350px"
            icon-right="add"
            :color="editing ? 'lightgray' : 'primary'"
            flat
            label="Adicionar um questionário"
            @click="onClickAddForm"
            :disable="editing"
          ></q-btn>
        </div>
      </div>
    </div>
    <div class="row" v-for="(form, index) in formsItems" :key="index">
      <div class="col">
        <FormEdit
          v-model="formsItems[index]"
          :category-options="categoriesItems"
          :on-cancel-form="onCancelForm"
        />
      </div>
    </div>

    <div class="fixed-top-right q-pa-md" style="padding-top: 40px">
      <q-btn round icon="help_outline" color="primary">
        <q-tooltip anchor="center start" self="center right">Informativo sobre a criação de questionários</q-tooltip>
      </q-btn>
    </div>
  </q-page>
</template>

<script lang="ts" setup>

import {computed, onMounted, ref} from 'vue';
import {IFormCreate} from 'src/interfaces/IForm';
import {useCategoryStore} from 'src/pinia/category';
import FormEdit from 'components/forms/FormEdit.vue';
import {useNotificationStore} from 'src/pinia/notification';

const categoryStore = useCategoryStore();
const notificationStore = useNotificationStore();

const formsItems = ref<IFormCreate[]>([]);

const categoriesItems = computed(() => categoryStore.categories);
const editing = ref(false);

function onClickAddForm() {
  const newForm: IFormCreate = {
    title: '',
    subtitle: '',
    category_id: '',
    is_active: false,
  }
  formsItems.value.unshift(newForm);
  editing.value = true;
}

function onCancelForm() {
  formsItems.value.shift();
  editing.value = false;
  notificationStore.showActionNotification('positive', 'Questionário cancelado com sucesso!');
}

onMounted(async() => {
  await categoryStore.getAllCategories();
})
</script>

<style scoped>

</style>
