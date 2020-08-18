import { HolidayType } from "../infra/typeorm/entities/Holiday";

export default interface ICreateHolidayDTO {
  name: string;
  type: HolidayType;
  day?: number;
  month?: number;
  county_id?: string | null;
  state_id?: string | null;
}
