import { search } from "src/core/domain/search-dto";
import { WeaterEntity } from "src/core/domain/weather.entity";
import { IWeaterRepository } from "src/core/domain/weather.repository.interface";

export class WeatherRepositoryPrisma implements IWeaterRepository {
  constructor() {}

    insert(data: WeaterEntity): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
    get(data: search): Promise<any> {
        return Promise.resolve('ok')
    }
}
