<template>
  <q-page class="q-gutter-lg q-pa-md">
    <div class="row">
      <div class="col">
        <FormEdit />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div style="display: flex; flex-direction: column; width: 100%; height: 100%; align-items: center">
          <q-btn style="max-width: 350px"  icon-right="add" color="primary" flat label="Adicionar um questionário" @click="onClickAddForm"></q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>

import {computed, onMounted, ref} from 'vue';
import IForm, {IFormCreate} from 'src/interfaces/IForm';
import {ICategory} from 'src/interfaces/ICategory';
import {useCategoryStore} from 'src/pinia/category';
import FormEdit from 'src/components/FormEdit.vue';

const categoryStore = useCategoryStore();

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
  formsItems.value.push(newForm);
  editing.value = true;
}

onMounted(async() => {
  await categoryStore.getAllCategories();
})
</script>

<style scoped>

</style>
