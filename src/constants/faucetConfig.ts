import { Constants } from '@bitsongjs/sdk';

export const faucetAmount = [{
  denom: "ubkn",
  amount: '10000000',
},{
  denom: "ueur",
  amount: '10000000',
},{
  denom: "uusd",
  amount: '10000000',
},{
  denom: "uyen",
  amount: '10000000',
},{
  denom: "ugbp",
  amount: '10000000',
}];

export const defaultFee = {
  amount: [
    {
      denom: "ubkn",
      amount: '2000',
    },
  ],
  gas: '180000', // 180k
};
