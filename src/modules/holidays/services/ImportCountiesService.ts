import csv from 'csv-parse';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import County from '@modules/holidays/infra/typeorm/entities/County';
import State from '@modules/holidays/infra/typeorm/entities/State';
import ICountiesRepository from '../repositories/ICountiesRepository';
import IStatesRepository from '../repositories/IStatesRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  path: string;
}

@injectable()
export default class ImportCountiesService {
  constructor(
    @inject('CountiesRepository')
    private countiesRepository: ICountiesRepository,

    @inject('StatesRepository')
    private statesRepository: IStatesRepository,
  ) {}

  public async execute({ path }: IRequest): Promise<void> {
    const csvCustom = csv({ from_line: 2 });

    const csvPipe = fs.createReadStream(path).pipe(csvCustom);

    const countiesImport: County[] = [];
    const states = await this.statesRepository.findAll();

    csvPipe.on('data', async data => {
      const [ cod, name ]: [string, string] = data.map((item: string) => item.trim());

      const codState = cod.slice(0, 2);

      const state = states.find((state: State) => state.cod === codState);
      
      if (!state) {
        throw new AppError(`State not found with cod ${codState}`);
      }
      
      const county = new County();
      county.cod = cod;
      county.name = name;
      county.state_id = state.id;
      countiesImport.push(county);
    });

    await new Promise(resolve => csvPipe.on('end', () => resolve()));

    await this.countiesRepository.create(countiesImport);
  }
}
