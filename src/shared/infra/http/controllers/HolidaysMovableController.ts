import { Request, Response, request } from 'express';
import { container } from 'tsyringe';
import CreateHolidayMovableService from '@modules/holidays/services/CreateHolidayMovableService';

export default class HolidaysMovableController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cod, name } = request.params;
    
    const createHolidayMovable = container.resolve(CreateHolidayMovableService);

    const {
      holiday,
      statusCode,
    } = await createHolidayMovable.execute({
      cod,
      name,
    });

    return response.status(statusCode).json(holiday);
  }
}
