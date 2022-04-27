import { fromBech32 } from '@cosmjs/encoding';

export const isValidAddress = (address: string) => {
  try {
    const { prefix, data } = fromBech32(address);

    if (prefix !== process.env.ADDRESS_PREFIX) {
      return false;
    }

    return data.length === 20;
  } catch {
    return false;
  }
};
