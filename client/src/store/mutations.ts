import { MutationTree } from 'vuex';
import { TState } from '@/store/state';

export enum MutationTypes {
    SET_DONATION_AMOUNT = 'SET_DONATION_AMOUNT',
    SET_CURRENT_CURRENCY_ID = 'SET_CURRENT_CURRENCY_ID',
}

export type TMutations<S = TState> = {
    [MutationTypes.SET_DONATION_AMOUNT](state: S, payload: number): void;
    [MutationTypes.SET_CURRENT_CURRENCY_ID](state: S, payload: number): void;
}

export const mutations: MutationTree<TState> & TMutations = {
  [MutationTypes.SET_DONATION_AMOUNT](state, payload: number) {
    if (payload !== state.donationAmount) {
      state.donationAmount = payload;
    }
  },
  [MutationTypes.SET_CURRENT_CURRENCY_ID](state, payload: number) {
    if (payload !== state.currentCurrencyId) {
      state.currentCurrencyId = payload;
    }
  },
};
