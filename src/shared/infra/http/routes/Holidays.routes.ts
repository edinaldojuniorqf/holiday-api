import Router from 'express';
import HolidaysController from '../controllers/HolidaysControler';
import HolidaysMovableController from '../controllers/HolidaysMovableController';
import { celebrate, Joi, Segments } from 'celebrate';

const holidaysRouter = Router();

const holidaysController = new HolidaysController();
const holidaysMovableController = new HolidaysMovableController();

const validateGet = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer().required(),
    day: Joi.number().integer().min(1).max(31).required(),
    month: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().required(),
  }
});

const validateCreateWithName = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer().required(),
    name: Joi.string().required(),
  }
});

const validateCreateWithDate = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer().required(),
    month: Joi.number().integer().min(1).max(12).required(),
    day: Joi.number().integer().min(1).max(31).required(),
  },
  [Segments.BODY]: {
    name: Joi.string().required(),
  }
});

const validateDeleteWithDate = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer().required(),
    month: Joi.number().integer().min(1).max(12).required(),
    day: Joi.number().integer().min(1).max(31).required(),
  },
});

const validateDeleteWithName = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer().required(),
    name: Joi.string().required(),
  }
});

holidaysRouter.get(
  '/:cod/:year(\\d+)-:month(\\d{2})-:day(\\d{2})',
  validateGet,
  holidaysController.show
);

holidaysRouter.route('/:cod/:month(\\d{2})-:day(\\d{2})')
  .put(validateCreateWithDate, holidaysController.create)
  .post(validateCreateWithDate, holidaysController.create);

holidaysRouter.route('/:cod/:name')
  .put(validateCreateWithName, holidaysMovableController.create)
  .post(validateCreateWithName, holidaysMovableController.create);

holidaysRouter.delete(
  '/:cod/:month(\\d{2})-:day(\\d{2})',
  validateDeleteWithDate,
  holidaysController.delete
);

holidaysRouter.delete(
  '/:cod/:name',
  validateDeleteWithName,
  holidaysMovableController.delete
);

export default holidaysRouter;
