<template>
  <div class="about">
    <h1>Isso eh uma pagina</h1>
    <button @click="fetchApi">REQUISICAO</button>
    {{ value }}

    <div>
      <h1>COUNTER: {{counter}}</h1>
      <div>
        <button @click="onClickIncrement">Increment</button>
        <button @click="onClickDecrement">Decrement</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue } from 'vue-class-component'
import axios from 'axios'
import store from '@/store';

export default class AboutView extends Vue {

  public value = {};

  public get counter () {
    return store.counterStore.count;
  }

  public onClickIncrement () {
    store.counterStore.increment();
  }

  public onClickDecrement () {
    store.counterStore.decrement();
  }

  public async fetchApi () {
    const response = await axios.get('http://localhost:8000/api/users/');
    if (response) {
      this.value = response.data
    }
  }
}
</script>
