import { search } from "./dtos";

export interface IWeatherUseCase {
    getWeather(data: search): Promise<any | null>;
    cronJob(): Promise<string>;
}