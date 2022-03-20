<template>
  <div>

  </div>
</template>

<script lang="ts" setup>

import {EFormFieldType} from 'src/interfaces/IFormField';
import {computed, defineProps} from 'vue';

interface Props {
  modelValue: string | Array<any>;
  fieldType: EFormFieldType;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const fieldModel = computed<string | Array<any>>({
  get () {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})

</script>

<style scoped>

</style>
