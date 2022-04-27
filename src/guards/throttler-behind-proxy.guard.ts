import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  private readonly logger = new Logger(ThrottlerGuard.name);

  protected getTracker(req: Record<string, string[] | string>): string {
    const ip = req.ips && req.ips.length > 0 ? req.ips[0] : (req.ip as string); // individualize IP extraction to meet your own needs

    this.logger.debug(`Guard request from: ${ip}`);

    return ip;
  }
}
