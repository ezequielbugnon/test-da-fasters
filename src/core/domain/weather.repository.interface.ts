import { WeatherByDate, search } from "./dtos";
import { WeaterEntity } from "./weather.entity";

export interface IWeatherRepository {
    insert(data: WeaterEntity[]): Promise<string>;
    get(data: WeatherByDate): Promise<any | null>;
}