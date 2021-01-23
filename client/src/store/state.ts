import { suggestion } from '@/utils/const';

export const state = {
  donationAmount: suggestion,
  currentCurrencyId: 0,
};

export type TState = typeof state;
