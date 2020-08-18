import Router from 'express';
import HolidaysController from '../controllers/HolidaysControler';
import HolidaysMovableController from '../controllers/HolidaysMovableController';
import { celebrate, Joi, Segments } from 'celebrate';

const holidaysRouter = Router();

const holidaysController = new HolidaysController();
const holidaysMovableController = new HolidaysMovableController();

const validateWithDate = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer(),
    day: Joi.number().integer().min(1).max(31),
    month: Joi.number().integer().min(1).max(12),
  }
});

const validateWithName = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer(),
    name: Joi.string(),
  }
});

holidaysRouter.route('/:cod/:day-:month')
  .put(validateWithDate, holidaysController.create)
  .post(validateWithDate, holidaysController.create);

holidaysRouter.put(
  '/:cod/:name',
  validateWithName,
  holidaysMovableController.create  
);

export default holidaysRouter;
