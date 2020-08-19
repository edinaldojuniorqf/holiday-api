import { HolidayType } from '../infra/typeorm/entities/Holiday';


export default class GetHolidayTypeService {
  public execute(cod: string): HolidayType {
    if (cod.toString().length === 2) {
      return HolidayType.State;
    }

    return HolidayType.Municipal;
  }
}
