import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Holiday, { HolidayType } from '../infra/typeorm/entities/Holiday';
import IHolidaysRepository from '../repositories/IHolidaysRepository';
import ICountiesRepository from '../repositories/ICountiesRepository';
import IStatesRepository from '../repositories/IStatesRepository';
import GetHolidayTypeService from '@modules/holidays/services/GetHolidayTypeService';

interface IRequest {
  cod: string;
  day: number;
  month: number;
}

interface IResponse {
  holiday: Holiday;
  statusCode: number;
}

@injectable()
export default class DeleteHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidayRepository: IHolidaysRepository,

    @inject('CountiesRepository')
    private countiesRepository: ICountiesRepository,

    @inject('StatesRepository')
    private statesRepository: IStatesRepository,

    @inject('GetHolidayTypeService')
    private getHolidayType: GetHolidayTypeService
  ) {}

  public async execute({ cod, day, month }: IRequest): Promise<IResponse> {
    let holiday: Holiday | undefined,
      statusCode = 204;

    const type = this.getHolidayType.execute(cod);

    const holidayNational = await this.holidayRepository.findByDayAndMonthAndType({
      day,
      month,
      type: HolidayType.National,
    });

    if (holidayNational) {
      throw new AppError(
        `It is not allowed to remove national holidays with code ${cod}`,
        403
      );
    }

    switch(type) {
      case HolidayType.State:
        const state = await this.statesRepository.findByCod(cod);

        if (!state) {
          throw new AppError(`State with cod ${cod} not found`, 404);
        }
        
        holiday = await this.holidayRepository.findByDayAndMonthAndTypeAndState({
          day,
          month,
          type,
          state_id: state.id,
        });
        break;

      case HolidayType.Municipal:
        const holidayState = await this.holidayRepository.findByDayAndMonthAndType({
          day,
          month,
          type: HolidayType.State
        });

        if (holidayState) {
          throw new AppError('Removing state holidays with city code is not allowed', 403);
        }        

        const county = await this.countiesRepository.findByCod(cod);

        if (!county) {
          throw new AppError(`County with cod ${cod} not found`, 404);
        }

        holiday = await this.holidayRepository.findByDayAndMonthAndTypeAndCounty({
          day,
          month,
          type,
          county_id: county.id,
        });
        break;
    }

    if (!holiday) {
      throw new AppError(`Holiday with cod ${cod} of day ${day}/${month} not found`, 404);
    }

    await this.holidayRepository.delete(holiday.id);

    return {
      holiday,
      statusCode
    }
  }
}
