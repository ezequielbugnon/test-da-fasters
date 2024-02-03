import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherPrismaModule } from '../repository/weather-prisma.module';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [WeatherPrismaModule]
})
export class WeatherModule {}
