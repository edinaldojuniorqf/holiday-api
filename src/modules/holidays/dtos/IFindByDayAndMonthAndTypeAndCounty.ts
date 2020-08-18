import { HolidayType } from "../infra/typeorm/entities/Holiday";

export default interface IFindByDayAndMonthAndTypeAndCounty {
  day: number;
  month: number;
  type: HolidayType;
  county_id: string;
}
