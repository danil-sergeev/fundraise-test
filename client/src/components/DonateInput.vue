<template>
  <div class="input-container">
    <span>
      {{prefix}}
    </span>
    <input
        v-model="value"
        @keypress="onlyNumber"
    >
    <select v-model="prefix">
      <option
        :key="opt.id"
        v-for="opt in prefixOptions"
      >
        {{opt.prefix}}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const DonateInput = defineComponent({
  emits: ['update:modelValue', 'update:activePrefix'],
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    activePrefix: {
      type: String,
      required: true,
    },
    prefixOptions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    prefix: {
      get(): string {
        return this.activePrefix;
      },
      set(value: string): void {
        this.$emit('update:activePrefix', value);
      },
    },
    value: {
      get(): number {
        return this.modelValue;
      },
      set(value: string) {
        // eslint-disable-next-line radix
        if (parseInt(value) >= 0) {
          const emitValue = parseFloat(value);
          this.$emit('update:modelValue', emitValue);
        }
      },
    },
  },
  methods: {
    onlyNumber($event: KeyboardEvent) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which;
      console.log(keyCode);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        $event.preventDefault();
      }
    },
  },
});

export default DonateInput;
</script>

<style scoped>

.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  height: 50px;
}

input {
  height: 30px;
  font-size: 18px;

  border: 2px solid #000;

  padding-left: 20px;

  outline: none;
  margin-left: 10px;

}

span {
  font-size: 20px;
}

select {
  height: 50px;
  font-size: 20px;
}

</style>
