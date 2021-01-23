/* eslint-disable no-use-before-define */
import { GetterTree } from 'vuex';
import { TState } from '@/store/state';
import { currencies, presets, TCurrency } from '@/utils/const';
import { numberToDivisable } from '@/utils/format-number';

export type MappedGetters = {
    [K in keyof TGetters]: ReturnType<TGetters[K]>;
}

export type TGetters = {
    currentCurrency(state: TState): TCurrency;
    presets(state: TState, getters: MappedGetters): number[];
    donateIsAllowed(state: TState): boolean;
};

export const getters: GetterTree<TState, TState> & TGetters = {
  currentCurrency(state) {
    const key = state.currentCurrencyId;
    return currencies[key];
  },
  // eslint-disable-next-line no-shadow
  presets(state, getters) {
    const currency = getters.currentCurrency;
    return presets.map((i) => numberToDivisable(i * currency.rate));
  },
  donateIsAllowed(state: TState): boolean {
    return state.donationAmount > 0;
  },
};
