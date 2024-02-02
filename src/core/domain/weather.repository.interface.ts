import { search } from "./search-dto";
import { WeaterEntity } from "./weather.entity";

export interface IWeaterRepository {
    insert(data: WeaterEntity): Promise<any | null>;
    get(data: search): Promise<any | null>;
}