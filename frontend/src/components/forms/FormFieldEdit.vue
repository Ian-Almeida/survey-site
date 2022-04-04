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
      <p class="text-h5">Campo de texto</p>
      <q-editor v-model="fieldModel.text_text" min-height="5rem"></q-editor>
    </template>

    <template v-else-if="props.fieldType === EFormFieldType.MultipleSelect">
      <p class="text-h5">Campo de múltipla escolha</p>
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

    <template v-else-if="props.fieldType === EFormFieldType.SingleSelect">
      <p class="text-h5">Campo de escolha única</p>
      <div class="row" v-for="(item, index) in fieldModel.single_selection_options" :key="index">
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

    <template v-else-if="props.fieldType === EFormFieldType.Video">
      <q-dialog v-model="fieldVideoDialog" persistent>
        <q-card>
          <q-card-section><span class="text-h5">Coloque o endereço do vídeo no Youtube</span></q-card-section>
          <q-separator />
          <q-card-section>
            <q-input dense v-model="fieldModel.video_src" autofocus />
          </q-card-section>
          <q-card-actions>
            <q-btn v-close-popup flat label="Voltar" color="secondary"></q-btn>
            <q-btn v-close-popup flat label="Confirmar" color="primary"></q-btn>
          </q-card-actions>
        </q-card>

      </q-dialog>
      <div class="row">
        <div class="col" v-if="fieldModel.video_src && !fieldVideoDialog">
          <p class="text-h5">Campo de vídeo</p>
          <q-video :src="parsedYoutubeVideoSrc" style="height: 400px" />
        </div>
      </div>
    </template>

    <template v-else-if="props.fieldType === EFormFieldType.Image">
      <div class="row">
        <div class="col">
          <q-dialog v-model="fieldImageDialog" persistent>
            <q-card>
              <q-card-section><span class="text-h5">Coloque o endereço da imagem</span></q-card-section>
              <q-separator />
              <q-card-section>
                <q-input dense v-model="fieldModel.image_src" autofocus />
              </q-card-section>
              <q-card-actions>
                <q-btn v-close-popup flat label="Voltar" color="secondary"></q-btn>
                <q-btn v-close-popup flat label="Confirmar" color="primary"></q-btn>
              </q-card-actions>
            </q-card>

          </q-dialog>
          <div class="row">
            <div class="col" v-if="fieldModel.image_src && !fieldImageDialog">
              <p class="text-h5">Campo de imagem</p>
              <q-img
                :src="fieldModel.image_src"
                spinner-color="white"
                style="height: 140px; max-width: 150px"
                alt="Imagem não pode ser carregada ou endereço inválido"
              >
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-negative text-white">
                    Não foi possível carregar a imagem
                  </div>
                </template>
              </q-img>
            </div>
          </div>
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
const fieldVideoDialog = ref(true);
const fieldImageDialog = ref(true);
const selectOptionLabel = ref('');

const fieldModel = computed<IFormField | IFormFieldCreate>({
  get () {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})

const parsedYoutubeVideoSrc = computed<string>(() => {
  const videoId = fieldModel.value.video_src?.split('=')[1];
  return `https://www.youtube.com/embed/${videoId}`;
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
