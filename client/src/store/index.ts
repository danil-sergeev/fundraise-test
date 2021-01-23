/**
 * @description
 * Не очень нравится вариант с Vuex, ибо нарушается условие по слабосвязанности и
 * бизнес логика приложения строится вокруг фреймворка.
 */
import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
} from 'vuex';
import { TState, state } from './state';
import { TGetters, getters } from './getters';
import { TMutations, mutations } from './mutations';
import { TActions, actions } from './actions';

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
  plugins: [createLogger()],
});

/**
 * @description
 * Так странно, потому что у Vuex4.0 еще нет нормальных генериков.
 */
export type Store = Omit<
    VuexStore<TState>,
    'getters' | 'commit' | 'dispatch'
    > & {
    commit<K extends keyof TMutations, P extends Parameters<TMutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<TMutations[K]>
} & {
    dispatch<K extends keyof TActions>(
        key: K,
        payload: Parameters<TActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<TActions[K]>
} & {
    getters: {
        [K in keyof TGetters]: ReturnType<TGetters[K]>
    }
}
