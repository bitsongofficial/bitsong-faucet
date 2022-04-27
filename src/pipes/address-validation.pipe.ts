import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { FaucetDto } from 'src/dto/faucet.dto';
import { isValidAddress } from 'src/utils';

@Injectable()
export class AddressValidationPipe
  implements PipeTransform<FaucetDto, FaucetDto>
{
  transform(query: FaucetDto) {
    if (query.address) {
      if (isValidAddress(query.address)) {
        return query;
      } else {
        throw new BadRequestException('Invalid address');
      }
    } else {
      throw new BadRequestException('Please provide an address query param');
    }
  }
}
