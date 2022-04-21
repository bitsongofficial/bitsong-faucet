import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressValidationPipe } from 'src/pipes/address-validation.pipe';
import { FaucetDto } from 'src/dto/faucet.dto';
import { AppService } from './app.service';

@ApiTags('Faucet')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getFaucet(@Query(AddressValidationPipe) query: FaucetDto) {
    return this.appService.sendCoins(query.address);
  }
}
