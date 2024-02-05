import { WeatherUseCase } from './weather-use-case';
import { IWeatherRepository } from '../domain/weather.repository.interface';
import { WeatherByDate, search } from '../domain/dtos';
import { WeatherEntity } from '../domain/weather.entity';

class RepositoryErr implements IWeatherRepository {
  insert(data: WeatherEntity[]): Promise<string> {
    throw new Error('Error');
  }
  get(data: WeatherByDate): Promise<WeatherEntity[]> {
    throw new Error('Error');
  }
}

class Repository implements IWeatherRepository {
    insert(data: WeatherEntity[]): Promise<string> {
      return Promise.resolve("Insert ok")
    }
    get(data: WeatherByDate): Promise<WeatherEntity[]> {
      let weather : WeatherEntity[] = [
        {
          id: '1',
          name:'Curitiba',
          weather:'',
          temp:200,
          speed:200,
          deg:2000,
        }
      ]
      return Promise.resolve(weather)
    }
  }

describe('Weather-use-cases', () => {
  let weatherUseCaseErr: WeatherUseCase;
  let repositoryErr: IWeatherRepository;
  let weatherUseCase: WeatherUseCase;
  let repository: IWeatherRepository;


  beforeEach(async () => {
    repositoryErr = new RepositoryErr();
    weatherUseCaseErr = new WeatherUseCase();
    weatherUseCaseErr.init(repositoryErr)

    repository = new Repository()
    weatherUseCase = new WeatherUseCase()
    weatherUseCase.init(repository)
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
          'Invalid date format, dates must be in yyyy-mm-dd format',
        );
      }
    });

    it('should return ok when serching a specific city weather"', async () => {
      let search: search = {
        cities: ['Curitiba'],
        startDate: '2023-02-04',
        endDate: '2023-02-04',
      };

      
      let response = await weatherUseCase.getWeather(search);


      expect(response).toHaveLength(1)
    });
  });
});
