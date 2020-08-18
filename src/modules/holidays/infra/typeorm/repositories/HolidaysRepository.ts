import { Repository, getRepository } from 'typeorm';
import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';
import ICreateHolidayDTO from '@modules/holidays/dtos/ICreateHolidayDTO';
import Holiday from '../entities/Holiday';
import IFindByDayAndMonthAndType from '@modules/holidays/dtos/IFindByDayAndMonthAndType';
import IUpdateNameDTO from '@modules/holidays/dtos/IUpdateNameDTO';
import AppError from '@shared/errors/AppError';
import IFindByNameAndStateOrCounty from '@modules/holidays/dtos/IFindByNameAndStateOrCounty';
import IFindByDayAndMonthAndTypeAndState from '@modules/holidays/dtos/IFindByDayAndMonthAndTypeAndState';
import IFindByDayAndMonthAndTypeAndCounty from '@modules/holidays/dtos/IFindByDayAndMonthAndTypeAndCounty';

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

  public async findByDayAndMonthAndType({
    day,
    month,
    type,
  }: IFindByDayAndMonthAndType): Promise<Holiday | undefined> {
    return await this.ormRepository.findOne({
      day,
      month,
      type,
    });
  }

  public async findByDayAndMonthAndTypeAndState(
    {
      day,
      month,
      type,
      state_id,
    }: IFindByDayAndMonthAndTypeAndState
  ): Promise<Holiday | undefined> {
    return await this.ormRepository.findOne({
      where: {
        day,
        month,
        type,
        state_id,
      }
    });
  }

  public async findByDayAndMonthAndTypeAndCounty(
    {
      day,
      month,
      type,
      county_id,
    }: IFindByDayAndMonthAndTypeAndCounty
  ): Promise<Holiday | undefined> {
    return await this.ormRepository.findOne({
      where: {
        day,
        month,
        type,
        county_id,
      }
    });
  }

  public async findByNameAndState({ name, state_id }: IFindByNameAndStateOrCounty): Promise<Holiday | undefined> {
    return await this.ormRepository.findOne({
      where: {
        name,
        state_id,
      }
    });
  }

  public async findByNameAndCounty({ name, county_id }: IFindByNameAndStateOrCounty): Promise<Holiday | undefined> {
    return await this.ormRepository.findOne({
      where: {
        name,
        county_id,
      }
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

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
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
