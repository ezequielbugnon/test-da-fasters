import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { WeatherModule } from './core/infrastructure/weather/weather.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration]
    }),
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
