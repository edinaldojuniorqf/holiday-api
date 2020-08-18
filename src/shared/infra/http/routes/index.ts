import { Router } from 'express';
import holidaysRouter from './Holidays.routes';
import uploadCountiesRouter from './UploadCounties.routes';

const routes = Router();
routes.use('/feriados', holidaysRouter);
routes.use('/upload-counties', uploadCountiesRouter);

export default routes;
