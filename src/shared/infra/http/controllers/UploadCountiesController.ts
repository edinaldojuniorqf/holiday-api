import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ImportCountiesService from '@modules/holidays/services/ImportCountiesService';

export default class UploadCountiesControler {
  public async create(request: Request, response: Response): Promise<void> {
    const { path } = request.file;
    
    const importCounties = container.resolve(ImportCountiesService);
    await importCounties.execute({ path });

    response.status(200).send(null);
  }
}
