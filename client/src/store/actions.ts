/* eslint-disable no-alert */
import { ActionContext, ActionTree } from 'vuex';
import { StatusCodes } from 'http-status-codes';
import { TMutations, MutationTypes } from '@/store/mutations';
import { TState } from '@/store/state';
import { _fetch, createApiEndpoint } from '@/utils/_fetch';

export enum Actions {
    DONATE = 'DONATE',
}

type TDonatePayload = {
    amount: number;
    currency: number;
};

type AugmentedActionContext = {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
} & Omit<ActionContext<TState, TState>, 'commit'>

export interface TActions {
    [Actions.DONATE](
        { commit }: AugmentedActionContext,
        payload: TDonatePayload
    ): Promise<void>
}

export const actions: ActionTree<TState, TState> & TActions = {
  async [Actions.DONATE]({ commit }, payload) {
    try {
      const response = await _fetch({
        endpoint: createApiEndpoint('/donate'),
        opts: {
          method: 'POST',
        },
        payload,
      });

      const data = await response.json();

      if (response.status === StatusCodes.CREATED) {
        window.alert(data.ok);
      } else if (response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        window.alert(data.message);
      }
    } finally {
      commit(MutationTypes.SET_DONATION_AMOUNT, 0);
    }
  },
};
