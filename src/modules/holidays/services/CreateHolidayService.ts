import { injectable, inject } from 'tsyringe';
import Holiday, { HolidayType } from '../infra/typeorm/entities/Holiday';
import IHolidaysRepository from '../repositories/IHolidaysRepository';
import ICreateHolidayDTO from '../dtos/ICreateHolidayDTO';
import ICountiesRepository from '../repositories/ICountiesRepository';
import AppError from '@shared/errors/AppError';
import IStatesRepository from '../repositories/IStatesRepository';
import GetHolidayTypeService from './GetHolidayTypeService';

interface IRequest {
  cod: string;
  name: string;
  day: number;
  month: number;
}

interface IResponse {
  holiday: Holiday,
  statusCode: number,
}

@injectable()
export default class CreateHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidayRepository: IHolidaysRepository,

    @inject('CountiesRepository')
    private countiesRepository: ICountiesRepository,

    @inject('StatesRepository')
    private statesRepository: IStatesRepository,

    @inject('GetHolidayTypeService')
    private getHolidayType: GetHolidayTypeService,
  ) {}
  
  public async execute({
    cod,
    name,
    day,
    month
  }: IRequest): Promise<IResponse> {
    const type = this.getHolidayType.execute(cod);

    const findHoliday = await this.holidayRepository.findByDayAndMonthAndType({
      day,
      month,
      type,
    });

    let holiday, statusCode;

    if (findHoliday) {
      holiday = await this.holidayRepository.updateName({
        id: findHoliday.id,
        name,
      });
      statusCode = 200;
    } else {
      let data: ICreateHolidayDTO = {
        name,
        type,
        day,
        month,
      };

      switch(type) {
        case HolidayType.Municipal:
          const county = await this.countiesRepository.findByCod(cod);
          if (!county) {
            throw new AppError(`County not found with cod ${cod}`);
          }
          data.county_id = county.id;
          break;
        
        case HolidayType.State:
          const state = await this.statesRepository.findByCod(cod);
          if (!state) {
            throw new AppError(`State not found with cod ${cod}`);
          }
          data.state_id = state.id;
          break;
      }

      holiday = await this.holidayRepository.create(data);
      statusCode = 201;
    }
    
    return {
      holiday,
      statusCode,
    };
  }
}
