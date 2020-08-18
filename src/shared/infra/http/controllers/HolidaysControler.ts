import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateHolidayService from '@modules/holidays/services/CreateHolidayService';

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
    
    response.status(statusCode).json(holiday);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    
  }
}
