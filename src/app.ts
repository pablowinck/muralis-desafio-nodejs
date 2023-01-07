import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from "./core/config/logger";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.get('/', (req: Request, res: Response) => {
    res.send(JSON.stringify({message: 'Hello World!'}));
});

app.listen(port, () => {
    logger.info(`[server]: Server is running at port ${port}`);
});