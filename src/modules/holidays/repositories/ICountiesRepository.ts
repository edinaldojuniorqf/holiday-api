import County from '../infra/typeorm/entities/County';
import ICreateCountyDTO from '../dtos/ICreateCountyDTO';

export default interface ICountRepository {
  findByCod(cod: string): Promise<County | undefined>;
  create(data: ICreateCountyDTO | ICreateCountyDTO[]): Promise<County | County[]>;
}
