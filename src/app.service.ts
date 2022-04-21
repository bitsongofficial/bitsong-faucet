import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { FaucetDto } from 'src/dto/faucet.dto';
import { TooManyRequestsException } from 'src/exceptions';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(@InjectQueue('faucet') private faucetQueue: Queue<FaucetDto>) {}

  async appendToQueue(address: string) {
    const jobs = await this.faucetQueue.getJobs(['waiting', 'active']);
    const addressJob = jobs.find((job) => job.data.address === address);

    if (!addressJob) {
      await this.faucetQueue.add({
        address,
      });

      return { status: 'in-queue' };
    }

    this.logger.error('Too Many Requests: ', address);

    throw new TooManyRequestsException();
  }

  async getJobs() {
    return await this.faucetQueue.getJobs([]);
  }

  async getJobCounts() {
    return await this.faucetQueue.getJobCounts();
  }
}
