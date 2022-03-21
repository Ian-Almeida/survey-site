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
          <q-checkbox v-model="agendar" label="Agendar lançamento" />
          <q-checkbox v-if="!agendar" v-model="formModel.is_active" label="Tornar ativo" />
        </div>
      </div>
      <div class="row q-gutter-lg" v-if="agendar">
        <div class="col-lg-2">
          <q-select
            v-model="launchSelected"
            :options="launchOptions"
            label="Tipo de lançamento"
          ></q-select>
        </div>
        <div class="col-lg-4">
          <q-input v-model="formModel.start_date" label="Data de lançamento">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-tooltip>Selecione a data</q-tooltip>
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="formModel.start_date" mask="DD/MM/YYYY HH:mm" :locale="BRLocale">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-tooltip>Selecione o horário</q-tooltip>
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="formModel.start_date" mask="DD/MM/YYYY HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-lg-2">
          <q-select
            v-model="stopSelected"
            :options="stopOptions"
            label="Tipo de fim"
          ></q-select>
        </div>

        <div class="col-lg-3">
          <q-input v-model="formModel.end_date" label="Data para o fim">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-tooltip>Selecione a data</q-tooltip>
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="formModel.end_date" mask="DD/MM/YYYY HH:mm" :locale="BRLocale">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>

            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-tooltip>Selecione o horário</q-tooltip>
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="formModel.end_date" mask="DD/MM/YYYY HH:mm" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fechar" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>

    <q-card-section v-for="(item, index) in formFields" :key="index">
      <q-separator class="q-mb-md"  size="3px"/>
      <div class="row">
        <div class="col-11">
          <FormFieldEdit v-model="formFields[index]" :field-type="item.type"/>
        </div>
        <div class="col flex justify-center items-center q-pa-md">
          <q-btn flat color="negative" label="Remover campo" @click="removeField(index)"></q-btn>
        </div>
      </div>


    </q-card-section>

    <q-separator inset />

    <q-card-section>
      <div style="display: flex; flex-direction: column; width: 100%; height: 100%; align-items: center">
        <q-btn style="max-width: 350px" size="sm" color="primary" flat label="Inserir campo">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="onClickAddField(EFormFieldType.Text)">
                <q-item-section>Texto</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onClickAddField(EFormFieldType.MultipleSelect)">
                <q-item-section>Multipla Escolha</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onClickAddField(EFormFieldType.SingleSelect)">
                <q-item-section>Escolha Única</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onClickAddField(EFormFieldType.Video)">
                <q-item-section>Vídeo</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onClickAddField(EFormFieldType.Image)">
                <q-item-section>Imagem</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onClickAddField(EFormFieldType.InputField)">
                <q-item-section>Edição de Texto</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-btn label="Pré visualização"></q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>

import IForm, {IFormCreate} from 'src/interfaces/IForm';
import IFormField, {IFormFieldCreate, newFormField, EFormFieldType} from 'src/interfaces/IFormField';
import {defineProps, computed, ref} from 'vue';
import {ICategory} from 'src/interfaces/ICategory';
import {BRDatetimeToDatetime, datetimeToBRDatetime, BRLocale} from '../utils';
import FormFieldEdit from 'src/components/FormFieldEdit.vue';

interface Props {
  modelValue: IFormCreate | IForm;
  categoryOptions: ICategory[];
}

enum ScheduleOptions {
  Imediato = 1,
  Agendado,
  Infinito,
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const launchSelected = ref<null | {label: string, value: number}>(null);
const stopSelected = ref<null | {label: string, value: number}>(null);
const agendar = ref(false);

const formFields = ref<IFormField[] | IFormFieldCreate[]>([]);

const launchOptions = [
  {
    label: 'Imediato',
    value: ScheduleOptions.Imediato,
  },
  {
    label: 'Agendado',
    value: ScheduleOptions.Agendado,
  },
]

const stopOptions = [
  {
    label: 'Infinito',
    value: ScheduleOptions.Infinito,
  },
  {
    label: 'Agendado',
    value: ScheduleOptions.Agendado,
  },
]

const formModel = computed<IFormCreate | IForm>({
  get () {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
})

function onClickAddField(fieldType: number) {
  console.log(fieldType)
  const newField = newFormField(fieldType, formFields.value.length+1);
  console.log(newField);

  formFields.value.push(newField);
  // const a = formModel.value.start_date
  // // console.log(BRDatetimeToDatetime(a))
  // console.log(BRDatetimeToDatetime(a))
  // console.log(datetimeToBRDatetime('2001-03-30T00:00:00'))
}

function removeField(itemIndex: number) {
  formFields.value.splice(itemIndex, 1);
}

</script>

<style scoped>

</style>
