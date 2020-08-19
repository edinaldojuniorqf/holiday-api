import Router from 'express';
import HolidaysController from '../controllers/HolidaysControler';
import HolidaysMovableController from '../controllers/HolidaysMovableController';
import { celebrate, Joi, Segments } from 'celebrate';

const holidaysRouter = Router();

const holidaysController = new HolidaysController();
const holidaysMovableController = new HolidaysMovableController();

holidaysRouter.get(
  '/:cod/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})',
  celebrate({
    [Segments.PARAMS]: {
      cod: Joi.number().integer().required(),
      day: Joi.number().integer().min(1).max(31).required(),
      month: Joi.number().integer().min(1).max(12).required(),
      year: Joi.number().integer().min(1900).max(9999).required(),
    }
  }),
  holidaysController.show
);

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

holidaysRouter.route('/:cod/:month(\\d{2})-:day(\\d{2})')
  .put(validateCreateWithDate, holidaysController.create)
  .post(validateCreateWithDate, holidaysController.create);

const validateCreateWithName = celebrate({
  [Segments.PARAMS]: {
    cod: Joi.number().integer().required(),
    name: Joi.string().required(),
  }
});

holidaysRouter.route('/:cod/:name')
  .put(validateCreateWithName, holidaysMovableController.create)
  .post(validateCreateWithName, holidaysMovableController.create);

holidaysRouter.delete(
  '/:cod/:month(\\d{2})-:day(\\d{2})',
  celebrate({
    [Segments.PARAMS]: {
      cod: Joi.number().integer().required(),
      month: Joi.number().integer().min(1).max(12).required(),
      day: Joi.number().integer().min(1).max(31).required(),
    },
  }),
  holidaysController.delete
);

holidaysRouter.delete(
  '/:cod/:name',
  celebrate({
    [Segments.PARAMS]: {
      cod: Joi.number().integer().required(),
      name: Joi.string().required(),
    }
  }),
  holidaysMovableController.delete
);

export default holidaysRouter;
