import { MutationTree } from 'vuex';
import { TState } from '@/store/state';

// eslint-disable-next-line no-shadow
export enum TMutationTypes {
    SET_DONATION_AMOUNT = 'SET_DONATION_AMOUNT',
    SET_CURRENT_CURRENCY_ID = 'SET_CURRENT_CURRENCY_ID',
}

export type TMutations<S = TState> = {
    [TMutationTypes.SET_DONATION_AMOUNT](state: S, payload: number): void;
    [TMutationTypes.SET_CURRENT_CURRENCY_ID](state: S, payload: number): void;
}

export const mutations: MutationTree<TState> & TMutations = {
  [TMutationTypes.SET_DONATION_AMOUNT](state, payload: number) {
    if (payload !== state.donationAmount) {
      state.donationAmount = payload;
    }
  },
  [TMutationTypes.SET_CURRENT_CURRENCY_ID](state, payload: number) {
    if (payload !== state.currentCurrencyId) {
      state.currentCurrencyId = payload;
    }
  },
};
