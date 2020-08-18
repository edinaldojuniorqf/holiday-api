import { Repository, getRepository } from 'typeorm';
import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';
import ICreateHolidayDTO from '@modules/holidays/dtos/ICreateHolidayDTO';
import Holiday from '../entities/Holiday';
import IFindOneByDayAndMonthAndType from '@modules/holidays/dtos/IFindOneByDayAndMonthAndType';
import IUpdateNameDTO from '@modules/holidays/dtos/IUpdateNameDTO';
import AppError from '@shared/errors/AppError';

export default class HolidaysRepository implements IHolidaysRepository {
  private ormRepository: Repository<Holiday>;

  constructor() {
    this.ormRepository = getRepository(Holiday);
  }

  public async findByName(name: string): Promise<Holiday | undefined> {
    return await this.ormRepository.findOne({
      where: {
        name,
      }
    });
  }

  public async findOneByDayAndMonthAndType({
    day,
    month,
    type,
  }: IFindOneByDayAndMonthAndType): Promise<Holiday | undefined> {
    return await this.ormRepository.findOne({
      day,
      month,
      type,
    });
  }

  public async create({
    name,
    type,
    day,
    month,
    county_id = null,
    state_id = null,
  }: ICreateHolidayDTO): Promise<Holiday> {
    const holiday = this.ormRepository.create({
      name,
      type,
      day,
      month,
      county_id,
      state_id,
    });

    return await this.ormRepository.save(holiday);
  }

  public async updateName({ id, name }: IUpdateNameDTO): Promise<Holiday> {
    let holiday = await this.ormRepository.findOne(id);

    if (!holiday) {
      throw new AppError(`Holiday:${id} not found.`);
    }

    holiday.name = name;
    holiday = await this.ormRepository.save(holiday);

    return holiday;
  }
}
