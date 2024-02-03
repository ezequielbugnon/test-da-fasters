import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { WeatherUseCase } from 'src/core/aplication/weather-use-case';
import { WeatherRepositoryPrisma } from '../repository/weather-prisma.repostory';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class WeatherService implements OnApplicationBootstrap {
  private readonly logger = new Logger(WeatherService.name);
  private weatherUseCase: WeatherUseCase;

  constructor(private readonly prisma: WeatherRepositoryPrisma) {
    this.weatherUseCase = new WeatherUseCase(prisma);
  }

  async onApplicationBootstrap() {
    this.handleCron();
  }

  @Cron('0 */15 * * * *')
  async handleCron() {
    const response = await this.weatherUseCase.cronJob();
    this.logger.debug('Called when the current second is 15', response);
  }
}
