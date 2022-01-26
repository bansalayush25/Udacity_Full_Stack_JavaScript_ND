import express from 'express';
import middleware from './utilities/middleware';

const app = express();
const port: number = 3000;

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('<h1>Welcome to Image Processing API</h1>');
});

app.get('/api', (req: express.Request, res: express.Response): void => {
  res.send('Welcome to API Route. Please visit <i>/api/images</i> route');
});

app.get(
  '/api/images',
  middleware,
  (req: express.Request, res: express.Response): void => {}
);

app.listen(port, () => {});

export default app;
