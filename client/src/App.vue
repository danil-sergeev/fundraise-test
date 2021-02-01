<template>
  <div class="container">
    <div class="modal">
      <div class="bagdes">
        <badge
            v-for="(preset, idx) in presets"
            @badge-selected="setDonateAmount"
            :key="preset"
            :value="preset"
            :prefix="currentCurrency.prefix"
            :is-active="checkIsActivePreset(idx)"
        />
      </div>
      <donate-input
          v-model="donationAmount"
          :active-prefix="currentCurrency.prefix"
          :prefix-options="currencies"
          @update:active-prefix="setActiveCurrencyId"
      />

      <button @click="donate" :class="{'disabled': !donateIsAllowed}">
        Donate
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Badge from '@/components/Badge.vue';
import DonateInput from '@/components/DonateInput.vue';

import { TMutationTypes } from '@/store/mutations';
import { currencies } from '@/utils/const';
import { Actions } from '@/store/actions';

const App = defineComponent({
  data() {
    return {
      currencies,
    };
  },
  components: {
    Badge,
    DonateInput,
  },
  methods: {
    checkIsActivePreset(idx: number): boolean {
      return this.presets[idx] === this.donationAmount;
    },
    setDonateAmount(v: number): void {
      this.$store.commit(TMutationTypes.SET_DONATION_AMOUNT, v);
    },
    setActiveCurrencyId(v: string): void {
      const nextCurrency = this.currencies.find((i) => i.prefix === v)!;
      this.$store.commit(TMutationTypes.SET_CURRENT_CURRENCY_ID, nextCurrency.id);
    },
    // eslint-disable-next-line consistent-return
    donate() {
      if (this.donationAmount) {
        this.$store.dispatch(Actions.DONATE, {
          amount: this.donationAmount,
          currency: this.currentCurrency.id,
        });
      }
    },
  },
  computed: {
    donationAmount: {
      get(): number {
        return this.$store.state.donationAmount;
      },
      set(v: number): void {
        this.$store.commit(TMutationTypes.SET_DONATION_AMOUNT, v);
      },
    },
    donateIsAllowed(): boolean {
      return this.$store.getters.donateIsAllowed;
    },
    presets() {
      return this.$store.getters.presets;
    },
    currentCurrency() {
      return this.$store.getters.currentCurrency;
    },
  },
});

export default App;
</script>

<style>
* {
  font-family: "Fira Code Retina", monospace;
}

.container {
  height: 100vh;
  display: grid;
  place-items: center;
}

.modal {
  width: 400px;
  height: 500px;

  border-radius: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px;
}

.bagdes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

button {
  margin-top: 40px;
  width: 100%;
  height: 50px;

  background-color: #3cc6a7;
  font-size: 28px;
  color: #fff;
}

.disabled {
  background-color: lightgray;
  cursor: not-allowed;
}
</style>
