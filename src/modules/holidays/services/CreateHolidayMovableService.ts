import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Holiday, { HolidayType } from "../infra/typeorm/entities/Holiday"
import IHolidaysRepository from '../repositories/IHolidaysRepository';
import ICountRepository from '../repositories/ICountiesRepository';
import GetHolidayMovableNameService from './GetHolidayMovableNameService';

interface IRequest {
  cod: string;
  name: string;
}

interface IResponse {
  holiday: Holiday;
  statusCode: number;
}

@injectable()
export default class CreateHolidayMovableService {
  constructor(
    @inject('HolidaysRepository')
    private holidayRepository: IHolidaysRepository,

    @inject('CountiesRepository')
    private countiesRepository: ICountRepository,

    @inject('GetHolidayMovableNameService')
    private getHolidayMovableName: GetHolidayMovableNameService
  ) {}

  public async execute({ cod, name}: IRequest): Promise<IResponse> {
    let holiday: Holiday | undefined,
      holidayName: string = '',
      statusCode = 200;

    holidayName = this.getHolidayMovableName.execute(name);

    const county = await this.countiesRepository.findByCod(cod);

    if (!county) {
      throw new AppError(`County not found with cod ${cod}`);
    }

    holiday = await this.holidayRepository.findByNameAndCounty({
      name,
      county_id: county.id,
    });

    if (!holiday) {
      holiday = await this.holidayRepository.create({
        name: holidayName,
        type: HolidayType.Municipal,
        county_id: county.id,
      });
      statusCode = 201;
    }

    return {
      holiday,
      statusCode,
    }
  }
}
