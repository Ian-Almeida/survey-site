<template>
  <q-card>
    <q-card-section>
      <div class="row q-gutter-lg">
        <div class="col">
          <q-input label="Título"  v-model="formModel.title"></q-input>
        </div>
        <div class="col">
          <q-input label="Subtítulo"  v-model="formModel.subtitle"></q-input>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <q-select
            v-model="formModel.category_id"
            :options="props.categoryOptions"
            label="Categoria"
            option-label="title"
            option-value="_id"
            map-options
            emit-value
          ></q-select>
        </div>
        <div class="col" style="display: flex; padding-top: 15px; padding-left: 5px">
          <q-checkbox v-model="formModel.is_active" label="Tornar ativo" />
        </div>
      </div>



    </q-card-section>

    <q-card-actions>
      <q-btn label="Pré visualização"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>

import IForm, {IFormCreate} from 'src/interfaces/IForm';
import {defineProps, computed} from 'vue';
import {ICategory} from 'src/interfaces/ICategory';

interface Props {
  modelValue: IFormCreate | IForm;
  categoryOptions: ICategory[];
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const formModel = computed({
  get () {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

</script>

<style scoped>

</style>

<!--<template>-->
<!--  <q-card>-->
<!--    <q-card-section>-->
<!--      <q-input label="Título"  v-model="theModel.title"></q-input>-->

<!--    </q-card-section>-->
<!--  </q-card>-->
<!--</template>-->

<!--<script lang="ts" setup>-->

<!--import IForm, {IFormCreate} from 'src/interfaces/IForm';-->
<!--import {onMounted, ref, defineProps, computed} from 'vue';-->

<!--interface Props {-->
<!--  modelValue: IFormCreate | IForm;-->
<!--}-->

<!--const props = defineProps<Props>();-->
<!--const emit = defineEmits(['update:modelValue']);-->

<!--const theModel = computed({-->
<!--  get () {-->
<!--    return props.modelValue;-->
<!--  },-->
<!--  set(val) {-->
<!--    emit('update:modelValue', val)-->
<!--  }-->
<!--})-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
