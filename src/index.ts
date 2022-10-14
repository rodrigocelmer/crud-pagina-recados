import express from 'express';
import appRoutes from './routes';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
appRoutes(app);

app.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado'));