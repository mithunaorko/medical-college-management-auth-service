import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors';
const app: Application = express();
const port = 5000;


app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// testing purpose
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Working successfully!');
})


export default app;