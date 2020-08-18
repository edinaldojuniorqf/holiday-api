import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import createConnection from '@shared/infra/typeorm';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';

createConnection();

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server on running on the port ${PORT}.`);
});
