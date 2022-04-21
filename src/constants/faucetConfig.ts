import { Constants } from '@bitsongjs/sdk';

export const faucetAmount = {
  denom: Constants.MicroDenom,
  amount: '10000000', // 10btsg
};

export const defaultFee = {
  amount: [
    {
      denom: Constants.MicroDenom,
      amount: '2000',
    },
  ],
  gas: '180000', // 180k
};
