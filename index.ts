import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.get('/', (request: Request, response: Response) => {
  response.send('Cleaning server initial setting');
});

app.listen(port, () => {
  console.log(`Server online at http://localhost:${port}'`);
});
