<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Gerenciador de questionários
        </q-toolbar-title>
        <q-btn v-if="me" flat :label="me.full_name">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="onLogout">
                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >

      <q-item clickable tag="a" @click="onClickDashboard">
        <q-item-section v-if="true" avatar>
          <q-icon name="space_dashboard"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
          <q-item-label caption>
            Visão geral
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable tag="a" @click="onClickQuestionarios">
        <q-item-section v-if="true" avatar>
          <q-icon name="playlist_add"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>Questionários</q-item-label>
          <q-item-label caption>Gerencie seus questionários</q-item-label>
        </q-item-section>

      </q-item>

      <q-item clickable tag="a" @click="onClickCategory">
        <q-item-section v-if="true" avatar>
          <q-icon name="category"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>Categorias</q-item-label>
          <q-item-label caption>Gerencie suas categorias</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable tag="a" @click="onClickQuestionarios">
        <q-item-section v-if="true" avatar>
          <q-icon name="question_answer"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>Respostas</q-item-label>
          <q-item-label caption>Gerencie as respostas feitas</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable tag="a" @click="onClickConfiguracoes">
        <q-item-section v-if="true" avatar>
          <q-icon name="settings"/>
        </q-item-section>

        <q-item-section>
          <q-item-label>Configurações</q-item-label>
          <q-item-label caption>

          </q-item-label>
        </q-item-section>
      </q-item>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts" setup>
import {computed, onBeforeMount, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserStore} from 'src/pinia/user';
import {useAuthStore} from 'src/pinia/auth';

const leftDrawerOpen = ref(false);
const miniState = ref(true);
const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();

const me = computed(() => userStore.userProfile);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function onLogout() {
  void authStore.logout();
  void router.push({name: 'index-logout'});
}

function onClickDashboard() {
  void router.push({name: 'index-home-admin'});
}

function onClickQuestionarios() {
  void router.push({name: 'index-home-form'});
}

function onClickCategory() {
  void router.push({name: 'index-home-category'});
}

function onClickConfiguracoes() {
  void router.push({name: 'index-home-setting'});
}

onBeforeMount(() => {
  void userStore.getMe();
})

</script>
