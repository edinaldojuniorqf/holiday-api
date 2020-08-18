import { HolidayType } from '../infra/typeorm/entities/Holiday';

export default interface IFindByDayAndMonthAndType {
  day: number,
  month: number,
  type: HolidayType,
}
