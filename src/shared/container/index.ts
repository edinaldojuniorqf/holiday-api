import { container } from 'tsyringe';

import CountiesRepository from '@modules/holidays/infra/typeorm/repositories/CountiesRepository';
import ICountiesRepository from '@modules/holidays/repositories/ICountiesRepository';
import IStatesRepository from '@modules/holidays/repositories/IStatesRepository';
import StatesRepository from '@modules/holidays/infra/typeorm/repositories/StatesRepository';

container.registerSingleton<ICountiesRepository>(
  'CountiesRepository',
  CountiesRepository,
);

container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository,
);
