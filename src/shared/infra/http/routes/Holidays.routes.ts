import Router from 'express';

const holidaysRouter = Router();

holidaysRouter.get('/', (request, response) => {
  response.json({ ok: true })
})

export default holidaysRouter;
