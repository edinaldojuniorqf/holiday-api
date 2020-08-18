import County from '../infra/typeorm/entities/County';
import ICreateCountyDTO from '../dtos/ICreateCountyDTO';

export default interface ICountRepository {
  create(data: ICreateCountyDTO | ICreateCountyDTO[]): Promise<County | County[]>;
}
