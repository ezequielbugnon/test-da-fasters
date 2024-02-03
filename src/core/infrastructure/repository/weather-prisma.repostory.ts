import { Injectable } from "@nestjs/common";
import { WeatherByDate, search } from "src/core/domain/dtos";
import { WeaterEntity } from "src/core/domain/weather.entity";
import { IWeatherRepository } from "src/core/domain/weather.repository.interface";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class WeatherRepositoryPrisma implements IWeatherRepository {
  constructor(private readonly prismaService: PrismaService) {}

    async insert(data: WeaterEntity[]): Promise<string> {
        try {
            for (const element of data) {
                await this.prismaService.weater.create({
                  data: {
                    name: element.name,
                    deg: element.deg,
                    weather: element.weather,
                    temp: element.temp,
                    speed: element.speed
                  },
                });
              }
            return 'Insert ok'
        } catch (error) {
            throw new Error('Error insert data')
        }
    }

    get(data: WeatherByDate): Promise<any> {
        return Promise.resolve('ok')
    }
}
