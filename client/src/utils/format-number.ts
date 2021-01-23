// eslint-disable-next-line no-bitwise
const getDigitsInNumber = (x: number): number => (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;

const numberToDivisable = (v: number): number => {
  const divider = 10 ** (getDigitsInNumber(v) - 1);
  return Math.round(v / divider) * divider;
};

const formatNumberToLocale = (v: number, opts?: Intl.NumberFormatOptions): string => {
  const enUsFormatter = new Intl.NumberFormat('en-US', opts);
  return enUsFormatter.format(v);
};

export {
  getDigitsInNumber,
  numberToDivisable,
  formatNumberToLocale,
};
