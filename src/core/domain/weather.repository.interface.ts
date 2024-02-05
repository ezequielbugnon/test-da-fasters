import { WeatherByDate, search } from "./dtos";
import { WeatherEntity } from "./weather.entity";

export interface IWeatherRepository {
    insert(data: WeatherEntity[]): Promise<string>;
    get(data: WeatherByDate): Promise<WeatherEntity[]>;
}