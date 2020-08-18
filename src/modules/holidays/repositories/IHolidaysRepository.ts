import Holiday from '../infra/typeorm/entities/Holiday';
import IFindByDayAndMonthAndType from '../dtos/IFindByDayAndMonthAndType';
import ICreateHolidayDTO from '../dtos/ICreateHolidayDTO';
import IUpdateNameDTO from '../dtos/IUpdateNameDTO';
import IFindByNameAndStateOrCounty from '../dtos/IFindByNameAndStateOrCounty';
import IFindByDayAndMonthAndTypeAndState from '../dtos/IFindByDayAndMonthAndTypeAndState';
import IFindByDayAndMonthAndTypeAndCounty from '../dtos/IFindByDayAndMonthAndTypeAndCounty';

export default interface IHolidaysRepository {
  findByName(name: string): Promise<Holiday | undefined>;
  findByDayAndMonthAndType(
    data: IFindByDayAndMonthAndType
  ): Promise<Holiday | undefined>;
  findByDayAndMonthAndTypeAndState(
    data: IFindByDayAndMonthAndTypeAndState
  ): Promise<Holiday | undefined>;
  findByDayAndMonthAndTypeAndCounty(
    data: IFindByDayAndMonthAndTypeAndCounty
  ): Promise<Holiday | undefined>;
  findByNameAndState(data: IFindByNameAndStateOrCounty): Promise<Holiday | undefined>;
  findByNameAndCounty(data: IFindByNameAndStateOrCounty): Promise<Holiday | undefined>;
  create(data: ICreateHolidayDTO): Promise<Holiday>;
  delete(id: string): Promise<void>;
  updateName(data: IUpdateNameDTO): Promise<Holiday>;
}
