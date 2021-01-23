<template>
  <div @click="onClick" class="bagde" :class="{'active': isActive}">
    {{formattedAmount}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatNumberToLocale } from '@/utils/format-number';

const Bagde = defineComponent({
  props: {
    isActive: Boolean,
    value: {
      type: Number,
      required: true,
    },
    prefix: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedAmount(): string {
      const value = formatNumberToLocale(this.value);
      return `${this.prefix} ${value}`;
    },
  },
  methods: {
    onClick() {
      return this.$emit('badge-selected', this.value);
    },
  },
});

export default Bagde;
</script>

<style scoped>

.bagde {
  margin-top: 10px;
  cursor: pointer;
  display: grid;
  place-items: center;

  height: 40px;
  width: 100px;
  background-color: lightgray;
  box-sizing: border-box;
  border: 1px solid #000;
  color: #fff;

  font-size: 18px;
  line-height: 0.88em;

  transition: all 0.3s ease;
}

.active {
  background-color: #3cc6a7;
  color: #fff;
  border: 0;
}
</style>
