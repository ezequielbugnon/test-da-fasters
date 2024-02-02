import { search } from "./search-dto";

export interface IWeatherUseCase {
    getWeather(data: search): Promise<any | null>;
}