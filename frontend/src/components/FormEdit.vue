<template>
  <q-card>
    <q-card-section>
      <q-input label="Título" :model-value="props.modelValue.title"></q-input>

    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import IForm, {IFormCreate} from 'src/interfaces/IForm';
import {onMounted, ref, defineProps, computed} from 'vue';

interface Props {
  modelValue: IFormCreate | IForm;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);


// const modelValue = ref<IFormCreate>({
//   title: '',
//   subtitle: '',
//   category_id: '',
//   is_active: false,
// });

// onMounted(() => {
//   formModel.value = {...props.formModel};
// })

</script>

<style scoped>

</style>
