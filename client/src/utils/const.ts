export const presets = [40, 100, 200, 1000, 2500, 5000];
export const suggestion = 40;

type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'RUB';

export type TCurrency = {
    id: number;
    name: string;
    code: CurrencyCode;
    prefix: string;
    rate: number;
}

export const currencies: TCurrency[] = [
  {
    id: 0, name: 'US Dollar', code: 'USD', prefix: '$', rate: 1,
  },
  {
    id: 1, name: 'Euro', code: 'EUR', prefix: '€', rate: 0.897597,
  },
  {
    id: 2, name: 'British Pound', code: 'GBP', prefix: '£', rate: 0.81755,
  },
  {
    id: 3, name: 'Russian Ruble', code: 'RUB', prefix: '₽', rate: 63.461993,
  },
];
