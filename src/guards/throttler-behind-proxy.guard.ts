import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable, Logger } from '@nestjs/common';
import * as requestIp from '@supercharge/request-ip';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  private readonly logger = new Logger(ThrottlerGuard.name);

  protected getTracker(req: Record<string, string[] | string>): string {
    const ip = requestIp.getClientIp(req); // individualize IP extraction to meet your own needs

    this.logger.debug(`Guard request from: ${ip}`);

    return ip;
  }
}
