import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { FaucetProcessor } from 'src/processors/faucet.processor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.THROTTLER_TTL),
      limit: parseInt(process.env.THROTTLER_LIMIT),
    }),
    BullModule.forRoot({
      limiter: {
        max: parseInt(process.env.QUEUE_MAX_JOBS),
        duration: parseInt(process.env.QUEUE_DURATION),
      },
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'faucet',
    }),
  ],
  controllers: [AppController],
  providers: [FaucetProcessor, AppService],
})
export class AppModule {}
