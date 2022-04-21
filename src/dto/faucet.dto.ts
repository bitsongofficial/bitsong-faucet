import { ApiProperty } from '@nestjs/swagger';

export class FaucetDto {
  @ApiProperty()
  address: string;
}
