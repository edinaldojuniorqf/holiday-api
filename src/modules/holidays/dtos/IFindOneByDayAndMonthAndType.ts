import { HolidayType } from '../infra/typeorm/entities/Holiday';

export default interface IFindOneByDayAndMonthAndType {
  day: number,
  month: number,
  type: HolidayType,
}
