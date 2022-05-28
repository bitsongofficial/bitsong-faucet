import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { stringToPath } from '@cosmjs/crypto';
import { assertIsDeliverTxSuccess } from '@cosmjs/stargate';
import { Constants, SigningBitsongClient } from '@bitsongjs/sdk';
import { faucetAmount, defaultFee } from 'src/constants';
import { Job } from 'bull';
import { FaucetDto } from 'src/dto/faucet.dto';
import { Logger } from '@nestjs/common';

@Processor('faucet')
export class FaucetProcessor {
  private readonly logger = new Logger(FaucetProcessor.name);

  @OnQueueActive()
  onActive(job: Job<FaucetDto>) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${job.data.address}...`,
    );
  }

  @Process()
  async sendCoins(job: Job<FaucetDto>) {
    this.logger.debug('Start sending to: ', job.data.address);

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
      job.data.address,
      faucetAmount,
      defaultFee,
      'Have fun!',
    );

    assertIsDeliverTxSuccess(result);

    this.logger.debug('Sending completed');

    return { status: 'ok' };
  }
}
