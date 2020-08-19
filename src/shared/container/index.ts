import { container } from 'tsyringe';

import CountiesRepository from '@modules/holidays/infra/typeorm/repositories/CountiesRepository';
import ICountiesRepository from '@modules/holidays/repositories/ICountiesRepository';
import IStatesRepository from '@modules/holidays/repositories/IStatesRepository';
import StatesRepository from '@modules/holidays/infra/typeorm/repositories/StatesRepository';
import IHolidaysRepository from '@modules/holidays/repositories/IHolidaysRepository';
import HolidaysRepository from '@modules/holidays/infra/typeorm/repositories/HolidaysRepository';

import GetHolidayTypeService from '@modules/holidays/services/GetHolidayTypeService';
import GetDateEasterService from '@modules/holidays/services/GetDateEasterService';
import GetDateCarnivalService from '@modules/holidays/services/GetDateCarnivalService';
import GetDateCorpusChristiService from '@modules/holidays/services/GetDateCorpusChristiService';
import GetDateGoodFridayService from '@modules/holidays/services/GetDateGoodFridayService';

container.registerSingleton<ICountiesRepository>(
  'CountiesRepository',
  CountiesRepository,
);

container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository,
);

container.registerSingleton<IHolidaysRepository>(
  'HolidaysRepository',
  HolidaysRepository,
);

container.registerSingleton(
  'GetHolidayTypeService',
  GetHolidayTypeService,
);

container.registerSingleton(
  'GetDateEasterService',
  GetDateEasterService,
);

container.registerSingleton(
  'GetDateCarnivalService',
  GetDateCarnivalService,
);

container.registerSingleton(
  'GetDateCorpusChristiService',
  GetDateCorpusChristiService,
);

container.registerSingleton(
  'GetDateGoodFridayService',
  GetDateGoodFridayService,
);
