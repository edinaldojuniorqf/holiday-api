import { HolidayType } from "../infra/typeorm/entities/Holiday";

export default interface IFindByDayAndMonthAndTypeAndState {
  day: number;
  month: number;
  type: HolidayType;
  state_id: string;
}
