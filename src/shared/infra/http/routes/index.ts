import { Router } from 'express';
import holidaysRouter from './Holidays.routes';

const routes = Router();
routes.use('/feriados', holidaysRouter);

export default routes;
