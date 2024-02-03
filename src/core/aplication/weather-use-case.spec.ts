import { WeatherUseCase } from './weather-use-case';
import { IWeatherRepository } from '../domain/weather.repository.interface';
import { WeatherByDate, search } from '../domain/dtos';
import { WeaterEntity } from '../domain/weather.entity';

class RepositoryErr implements IWeatherRepository {
  insert(data: WeaterEntity[]): Promise<string> {
    throw new Error('Error');
  }
  get(data: WeatherByDate): Promise<any> {
    throw new Error('Error');
  }
}

class Repository implements IWeatherRepository {
    insert(data: WeaterEntity[]): Promise<string> {
      return Promise.resolve("Insert ok")
    }
    get(data: WeatherByDate): Promise<any> {
      throw new Error('Error');
    }
  }

describe('Weather-use-cases', () => {
  let weatherUseCaseErr: WeatherUseCase;
  let repositoryErr: IWeatherRepository;
  let weatherUseCase: WeatherUseCase;
  let repository: IWeatherRepository;


  beforeEach(async () => {
    repositoryErr = new RepositoryErr();
    weatherUseCaseErr = new WeatherUseCase(repositoryErr);

    repository = new Repository()
    weatherUseCase = new WeatherUseCase(repository)
  });

  describe('Use-case cron job', () => {
    it('Test var .env', () => {
        const testVariable = process.env.TEST_VARIABLE;
        expect(testVariable).toBe('testing123');
    });

    it('should return err"', async () => {
       try {    
        await weatherUseCaseErr.cronJob();
       } catch (error) {
        expect(error.message).toEqual(
            'Error',
          );
       }
    });

    it('should return ok when cron job insert in database"',async () => {
        const response = await weatherUseCase.cronJob()
        expect(response).toEqual('Insert ok')
     });


  });

  describe('Use-case get weather', () => {
    it('should return err"', async () => {
      let search: search = {
        cities: [],
        startDate: '',
        endDate: '',
      };

      try {
        await weatherUseCaseErr.getWeather(search);
      } catch (error) {
        expect(error.message).toEqual(
          'Invalid date format, dates must be in dd/mm/yyyy format',
        );
      }
    });
  });
});
