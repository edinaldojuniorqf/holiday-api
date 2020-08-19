import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Holiday, { HolidayType } from '../infra/typeorm/entities/Holiday';
import IHolidaysRepository from '../repositories/IHolidaysRepository';
import ICountiesRepository from '../repositories/ICountiesRepository';
import IStatesRepository from '../repositories/IStatesRepository';
import GetHolidayTypeService from './GetHolidayTypeService';
import GetDateEasterService from './GetDateEasterService';
import GetDateCarnivalService from './GetDateCarnivalService';
import GetDateCorpusChristiService from './GetDateCorpusChristiService';
import GetDateGoodFridayService from './GetDateGoodFridayService';

interface IRequest {
  cod: string;
  day: number;
  month: number;
  year: number;
}

interface IResponse {
  holiday: Holiday;
  statusCode: number;
}

@injectable()
export default class GetHolidayService {
  constructor(
    @inject('HolidaysRepository')
    private holidayRepository: IHolidaysRepository,

    @inject('CountiesRepository')
    private countiesRepository: ICountiesRepository,

    @inject('StatesRepository')
    private statesRepository: IStatesRepository,

    @inject('GetHolidayTypeService')
    private getHolidayType: GetHolidayTypeService,

    @inject('GetDateEasterService')
    private getDateEasterService: GetDateEasterService,

    @inject('GetDateCarnivalService')
    private getDateCarnivalService: GetDateCarnivalService,

    @inject('GetDateCorpusChristiService')
    private getDateCorpusChristiService: GetDateCorpusChristiService,

    @inject('GetDateGoodFridayService')
    private getDateGoodFridayService: GetDateGoodFridayService,
  ) {}

  public async execute({ cod, day, month, year }: IRequest): Promise<IResponse> {
    let holiday: Holiday | undefined;

    const holidayType = this.getHolidayType.execute(cod);

    const dateEaster = this.getDateEasterService.execute(year);

    if (holidayType == HolidayType.Municipal) {
      const county = await this.countiesRepository.findByCod(cod);

      if (county) {
        holiday = await this.holidayRepository.findByDayAndMonthAndTypeAndCounty({
          day,
          month,
          type: holidayType,
          county_id: county?.id,
        });

        if (holiday) {
          return {
            statusCode: 200,
            holiday,
          };
        }

        const dateCarnival = this.getDateCarnivalService.execute(dateEaster);

        if (
          year === dateCarnival.getFullYear() && 
          month === (dateCarnival.getMonth() + 1) && 
          day === dateCarnival.getDate()
        )  {
          holiday = await this.holidayRepository.findByNameAndCounty({
            name: 'Carnaval',
            county_id: county.id,
          });

          if (holiday) {
            return {
              statusCode: 200,
              holiday,
            };
          }
        }

        const dateCorpusChisti = this.getDateCorpusChristiService.execute(dateEaster);
        if (
          year === dateCorpusChisti.getFullYear() && 
          month === (dateCorpusChisti.getMonth() + 1) && 
          day === dateCorpusChisti.getDate()
        )  {
          holiday = await this.holidayRepository.findByNameAndCounty({
            name: 'Corpus Christi',
            county_id: county.id,
          });

          if (holiday) {
            return {
              statusCode: 200,
              holiday,
            };
          }
        }

        const state = await county.state;

        if (state) {
          holiday = await this.holidayRepository.findByDayAndMonthAndTypeAndState({
            day,
            month,
            type: HolidayType.State,
            state_id: state.id,
          });
    
          if (holiday) {
            return {
              statusCode: 200,
              holiday,
            };
          }
        }
      }
    }

    const state = await this.statesRepository.findByCod(cod);

    if (state) {
      holiday = await this.holidayRepository.findByDayAndMonthAndTypeAndState({
        day,
        month,
        type: holidayType,
        state_id: state.id,
      });

      if (holiday) {
        return {
          statusCode: 200,
          holiday,
        };
      }
    }

    holiday = await this.holidayRepository.findByDayAndMonthAndType({
      day,
      month,
      type: HolidayType.National
    });

    if (holiday) {
      return {
        statusCode: 200,
        holiday,
      }
    }

    const dateGoodFriday = this.getDateGoodFridayService.execute(dateEaster);
    if (
      year === dateGoodFriday.getFullYear() && 
      month === (dateGoodFriday.getMonth() + 1) && 
      day === dateGoodFriday.getDate()
    )  {
      holiday = new Holiday();
      holiday.name = 'Sexta-Feira Santa';
      holiday.day = day;
      holiday.month = month;
      holiday.type = HolidayType.National

      if (holiday) {
        return {
          statusCode: 200,
          holiday,
        };
      }
    }

    if (
      year === dateEaster.getFullYear() && 
      month === (dateEaster.getMonth() + 1) && 
      day === dateEaster.getDate()
    )  {
      holiday = new Holiday();
      holiday.name = 'Domingo de Páscoa';
      holiday.day = day;
      holiday.month = month;
      holiday.type = HolidayType.National

      if (holiday) {
        return {
          statusCode: 200,
          holiday,
        };
      }
    }

    throw new AppError('No holidays found', 404);
  }
}
