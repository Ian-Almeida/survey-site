<template>
  <div
    class="fullscreen bg-accent text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>

      <div class="text-h2" style="opacity: 0.4"><span>Opa! Caminho errado...</span></div>
      <div class="text-h4" style="opacity: 0.4">Página não encontrada</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="accent"
        unelevated
        to="/"
        label="Voltar"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error404',
});
</script>
