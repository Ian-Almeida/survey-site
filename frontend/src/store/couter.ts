import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment (val = 1) {
      this.count += val;
    },
    async waitAndIncrement () {
      setTimeout(() => {
        this.count++;
      }, 2000);
    },
    decrement (val = 1) {
      this.count -= val;
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
});
