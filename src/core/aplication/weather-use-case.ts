import { search } from '../domain/search-dto';
import { IWeatherUseCase } from '../domain/weather-usecase.interface';
import { IWeaterRepository } from '../domain/weather.repository.interface';

export class WeatherUseCase implements IWeatherUseCase {
  constructor(private readonly weatherRepository: IWeaterRepository) {}

  async getWeather(data: search): Promise<any> {
    return await this.weatherRepository.get(data)
  }
}
