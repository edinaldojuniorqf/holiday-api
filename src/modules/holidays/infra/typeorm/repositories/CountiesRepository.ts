import ICountiesRepository from '@modules/holidays/repositories/ICountiesRepository';
import ICreateCountyDTO from '@modules/holidays/dtos/ICreateCountyDTO';
import County from '../entities/County';
import { Repository, getRepository } from 'typeorm';

export default class CountiesRepository implements ICountiesRepository {
  private ormRepository: Repository<County>;

  constructor() {
    this.ormRepository = getRepository(County);
  }

  public async create(data: ICreateCountyDTO | ICreateCountyDTO[]): Promise<County | County[]> {
    if (data instanceof Array) {
      const counties = data.map(item => this.ormRepository.create(item));
      await this.ormRepository.save(counties);
      return counties;
    } else {
      let county = await this.ormRepository.findOne({
        where: {
          cod: data.cod
        }
      })

      if (!county) {
        county = this.ormRepository.create(data);
      }

      await this.ormRepository.save(county);
      return county;
    }
  }
}
