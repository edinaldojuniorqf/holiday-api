import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateHolidayMovableService from '@modules/holidays/services/CreateHolidayMovableService';
import DeleteHolidayMovableService from '@modules/holidays/services/DeleteHolidayMovableService';

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

  public async delete(request: Request, response: Response): Promise<void> {
    const { cod, name } = request.params;

    const deleteHolidayMovable = container.resolve(DeleteHolidayMovableService);

    const { statusCode } = await deleteHolidayMovable.execute({ cod, name });

    response.status(statusCode).send();
  }
}
