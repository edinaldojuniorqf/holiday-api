import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateHolidayService from '@modules/holidays/services/CreateHolidayService';
import DeleteHolidayService from '@modules/holidays/services/DeleteHolidayService';
import GetHolidayService from '@modules/holidays/services/GetHolidayService';

export default class HolidaysControler {
  public async create(request: Request, response: Response): Promise<void> {
    const { cod, day, month } = request.params;
    const { name } = request.body;

    const createHoliday = container.resolve(CreateHolidayService);

    const { holiday, statusCode } = await createHoliday.execute({
      cod,
      name,
      day: Number(day),
      month: Number(month),
    });
    
    response.status(statusCode).json(holiday);CreateHolidayService
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { cod, day, month } = request.params;

    const deleteHoliday = container.resolve(DeleteHolidayService);

    const {
      statusCode,
    } = await deleteHoliday.execute({
      cod,
      day: Number(day),
      month: Number(month),
    });

    response.status(statusCode).send();
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { cod, year, month, day } = request.params;

    const getHoliday = container.resolve(GetHolidayService);
    
    const { statusCode, holiday } = await getHoliday.execute({
      cod,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    response.status(statusCode).json(holiday);
  }
}
