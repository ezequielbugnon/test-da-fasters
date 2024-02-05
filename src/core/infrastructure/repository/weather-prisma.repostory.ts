import { Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { WeatherByDate } from "src/core/domain/dtos";
import { WeatherEntity } from "src/core/domain/weather.entity";
import { IWeatherRepository } from "src/core/domain/weather.repository.interface";
import { PrismaService } from "src/database/prisma.service";
import { CustomError } from "src/utils/customError";

@Injectable()
export class WeatherRepositoryPrisma implements IWeatherRepository {
  constructor(private readonly prismaService: PrismaService) {}

    async insert(data: WeatherEntity[]): Promise<string> {
        try {
            for (const element of data) {
                await this.prismaService.weather.create({
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
          if (
            error instanceof PrismaClientKnownRequestError ||
            error instanceof PrismaClientValidationError
          ) {
            throw CustomError.badRequest("Error inserting info");
          } else {
            throw error;
          }
        }
    }

    async get(data: WeatherByDate): Promise<any> {
        try {
            return await this.prismaService.weather.findMany({
                where: {
                    name: {
                        in: data.cities.map(c =>  c )
                    },
                    createdAt: {
                      gte: data.startDate,
                      lte: data.endDate,
                    },
                }
            })
        } catch (error) {
          if (
            error instanceof PrismaClientKnownRequestError ||
            error instanceof PrismaClientValidationError
          ) {
            throw CustomError.badRequest("Error reading info of weather");
          } else {
            throw error;
          }
        }
    }
}
