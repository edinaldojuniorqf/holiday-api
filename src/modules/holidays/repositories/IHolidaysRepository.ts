import Holiday from '../infra/typeorm/entities/Holiday';
import IFindOneByDayAndMonthAndType from '../dtos/IFindOneByDayAndMonthAndType';
import ICreateHolidayDTO from '../dtos/ICreateHolidayDTO';
import IUpdateNameDTO from '../dtos/IUpdateNameDTO';

export default interface IHolidaysRepository {
  findByName(name: string): Promise<Holiday | undefined>;
  findOneByDayAndMonthAndType(
    data: IFindOneByDayAndMonthAndType
  ): Promise<Holiday | undefined>;
  create(data: ICreateHolidayDTO): Promise<Holiday>;
  updateName(data: IUpdateNameDTO): Promise<Holiday>;
}
