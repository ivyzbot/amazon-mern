import express, { Request, Response } from 'express';
import { sampleProducts } from './data';
import cors from 'cors';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

console.log(2);
// Routes
app.get('/api/products', (req: Request, res: Response) => {
  console.log(1);
  res.json(sampleProducts);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
