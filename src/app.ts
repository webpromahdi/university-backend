import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Mahi!');
});

app.use(errorHandler);
app.use(notFound);

export default app;
