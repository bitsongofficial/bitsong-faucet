import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressValidationPipe } from 'src/pipes/address-validation.pipe';
import { FaucetDto } from 'src/dto/faucet.dto';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from './guards/throttler-behind-proxy.guard';

@ApiTags('Faucet')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(ThrottlerBehindProxyGuard)
  @Throttle(
    parseInt(process.env.THROTTLER_TTL),
    parseInt(process.env.THROTTLER_LIMIT),
  )
  @Get()
  getFaucet(@Query(AddressValidationPipe) query: FaucetDto) {
    return this.appService.appendToQueue(query.address);
  }

  @Get('queue')
  getJobs() {
    return this.appService.getJobs();
  }

  @Get('queue-counts')
  getJobCounts() {
    return this.appService.getJobCounts();
  }
}
