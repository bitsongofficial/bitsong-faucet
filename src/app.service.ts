import { Injectable } from '@nestjs/common';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { stringToPath } from '@cosmjs/crypto';
import { assertIsDeliverTxSuccess } from '@cosmjs/stargate';
import { Constants, SigningBitsongClient } from '@bitsongjs/sdk';
import { faucetAmount, defaultFee } from 'src/constants';

@Injectable()
export class AppService {
  async sendCoins(recipientAddress: string) {
    const faucetWallet = await DirectSecp256k1HdWallet.fromMnemonic(
      process.env.FAUCET_MNEMONIC,
      {
        prefix: Constants.Bech32PrefixAccAddr,
        hdPaths: [stringToPath(Constants.getHdPath())],
      },
    );

    const bitsong = await SigningBitsongClient.connectWithSigner(
      process.env.RPC_URL,
      faucetWallet,
    );

    const result = await bitsong.sendTokens(
      process.env.FAUCET_ADDRESS,
      recipientAddress,
      [faucetAmount],
      defaultFee,
      'Have fun!',
    );

    assertIsDeliverTxSuccess(result);

    return { status: 'ok' };
  }
}
