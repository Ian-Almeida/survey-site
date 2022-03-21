<template>
  <div>
    <q-dialog v-model="selectsDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Escreva um rótulo</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="selectOptionLabel" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup @click="selectOptionLabel=''"/>
          <q-btn flat label="Confirmar" v-close-popup @click="addSelectsItem"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <template v-if="props.fieldType === EFormFieldType.Text">
      <q-editor v-model="fieldModel.text_text" min-height="5rem"></q-editor>
    </template>

    <template v-else-if="props.fieldType === EFormFieldType.MultipleSelect">
      <div class="row" v-for="(item, index) in fieldModel.multiple_checkbox_options" :key="index">
        <div class="col">
          <q-btn flat round color="negative" icon="remove" @click="removeSelectsItem(index)"/>
          <q-checkbox :label="item.label" :model-value="true" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-btn flat round color="primary" icon="add" @click="selectsDialog = true"/>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>

import IFormField, {EFormFieldType, IFormFieldCreate} from 'src/interfaces/IFormField';
import {computed, defineProps, ref} from 'vue';

interface Props {
  modelValue: IFormField | IFormFieldCreate;
  fieldType: EFormFieldType;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const selectsDialog = ref(false);
const selectOptionLabel = ref('');

const fieldModel = computed<IFormField | IFormFieldCreate>({
  get () {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})

function removeSelectsItem(itemIndex: number) {
  if (props.fieldType === EFormFieldType.MultipleSelect) {
    fieldModel.value.multiple_checkbox_options?.splice(itemIndex, 1);
  } else if (props.fieldType === EFormFieldType.SingleSelect) {
    fieldModel.value.single_selection_options?.splice(itemIndex, 1);
  }
}

function addSelectsItem() {
  const obj = {
    value: false,
    label: selectOptionLabel.value,
    styles: {},
  };
  if (props.fieldType === EFormFieldType.MultipleSelect) {
    fieldModel.value.multiple_checkbox_options?.push(obj);
  } else if (props.fieldType === EFormFieldType.SingleSelect) {
    fieldModel.value.single_selection_options?.push(obj);
  }


  selectOptionLabel.value = '';
}

</script>

<style scoped>

</style>
