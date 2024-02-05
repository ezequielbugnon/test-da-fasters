import { Module } from '@nestjs/common';
import { WeatherRepositoryPrisma } from './weather-prisma.repostory';
import { PrismaModule } from 'src/database/prisma.module';


@Module({
  imports: [PrismaModule],
  providers: [WeatherRepositoryPrisma],
  exports:[WeatherRepositoryPrisma]
})
export class WeatherPrismaModule {}
