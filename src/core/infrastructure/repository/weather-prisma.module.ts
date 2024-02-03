import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { WeatherRepositoryPrisma } from './weather-prisma.repostory';


@Module({
  imports: [],
  providers: [PrismaService, WeatherRepositoryPrisma],
  exports:[WeatherRepositoryPrisma]
})
export class WeatherPrismaModule {}
