import axios from 'axios';
import { WeatherAPI, WeatherByDate, search } from '../domain/dtos';
import { IWeatherUseCase } from '../domain/weather-use-case.interface';
import { IWeatherRepository } from '../domain/weather.repository.interface';
import { WeaterEntity } from '../domain/weather.entity';

export class WeatherUseCase implements IWeatherUseCase {
  private temperatureData: WeaterEntity[];
  constructor(private readonly weatherRepository: IWeatherRepository) {
    this.temperatureData = [];
  }

  async getWeather(data: search): Promise<any> {
    const { cities, endDate, startDate } = data;

    if (
      !this.isValidDateFormat(startDate) ||
      !this.isValidDateFormat(endDate)
    ) {
      throw new Error(
        'Invalid date format, dates must be in dd/mm/yyyy format',
      );
    }

    if (cities && cities.length > 0) {
      throw new Error('cities could not empty');
    }
    const parseStartDate = this.parseDate(startDate);
    const parseEndDate = this.parseDate(endDate);

    try {
      const weathear: WeatherByDate = {
        cities,
        startDate: parseStartDate,
        endDate: parseEndDate,
      };
      return await this.weatherRepository.get(weathear);
    } catch (error) {
      throw error;
    }
  }

  async cronJob():Promise<string> {
    try {
      const cities = ['Sao Paulo', 'Curitiba', 'Florianopolis'];
      const apiKey = process.env.API_KEY;

      const promises = cities.map(async (city) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
        );

        const data: WeatherAPI = response.data;
        const temp = data.main.temp;
        const name = data.name;
        const weather = data.weather[0].description;
        const speed = data.wind.speed;
        const deg = data.wind.deg;

        this.temperatureData.push({ name, temp, weather, speed, deg });
      });

      await Promise.all(promises);

      return await this.weatherRepository.insert(this.temperatureData);
    } catch (error) {
      throw error;
    }
  }

  parseDate(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  isValidDateFormat(dateString) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  }
}
