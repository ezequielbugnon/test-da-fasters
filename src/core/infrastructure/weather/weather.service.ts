import { Injectable, Logger } from '@nestjs/common';
import { WeatherUseCase } from 'src/core/aplication/weather-use-case';
import { WeatherRepositoryPrisma } from '../repository/weather-prisma.repostory';
import { Cron } from '@nestjs/schedule';
import { search } from 'src/core/domain/dtos';
import { WeatherEntity } from 'src/core/domain/weather.entity';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(private readonly weatherUseCase: WeatherUseCase, private readonly prisma: WeatherRepositoryPrisma) {
    this.weatherUseCase.init(prisma)
    this.handleCron()
  }

  @Cron('0 */15 * * * *')
  async handleCron() {
    const response = await this.weatherUseCase.cronJob();
    this.logger.debug('Called every 15 minute', response);
  }


  async getWeather(data: search) :Promise<WeatherEntity[]>{
    return await this.weatherUseCase.getWeather(data)
  }
}
