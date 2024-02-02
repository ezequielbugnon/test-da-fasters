import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async onApplicationBootstrap() {
    this.handleCron();
  }

  @Cron('0 */15 * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 15');
  }
}
