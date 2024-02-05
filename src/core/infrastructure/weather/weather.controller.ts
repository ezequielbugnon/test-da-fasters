import { Controller, Get, Query, ValidationPipe, Res } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherEntity } from 'src/core/domain/weather.entity';
import { WeatherDTO } from './weather-dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomError } from 'src/utils/customError';

@ApiTags('Weather')
@Controller('/weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  };

  @Get()
  @ApiOperation({ summary: 'Get weather information for specified cities and date range' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved weather information', isArray: true })
  @ApiQuery({
    name: 'cities',
    required: true,
    isArray: true,
    type: String,
    description: 'Array of cities',
    example: ['Curitiba', 'Sao Paulo'],
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    description: 'Start date in yyyy-mm-dd format',
    example: '2024-02-04',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    description: 'End date in yyyy-mm-dd format',
    example: '2024-02-10',
  })
  getWeather(
    @Query(new ValidationPipe({ transform: true })) weatherDto: WeatherDTO,
    @Res() res: Response
  ) {
    this.weatherService.getWeather(weatherDto)
    .then((data) => res.json(data))
    .catch((error) => this.handleError(error, res));
  }
}
