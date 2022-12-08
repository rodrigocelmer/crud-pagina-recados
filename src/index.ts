import express from 'express';
import appRoutes from './routes';
import cors from "cors";
import { pgHelper } from './database/pg-helper';
import { redisHelper } from './database/redis-helper';

const app = express();

app.use(express.json());
app.use(cors());
appRoutes(app);

pgHelper.connect()
.then(() => {
    redisHelper.connect();
    app.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado'));
})
.catch((err) => console.log(err));