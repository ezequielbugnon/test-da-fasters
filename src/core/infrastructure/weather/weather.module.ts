import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherPrismaModule } from '../repository/weather-prisma.module';
import { WeatherUseCase } from 'src/core/aplication/weather-use-case';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService, WeatherUseCase],
  imports: [WeatherPrismaModule]
})
export class WeatherModule {}
