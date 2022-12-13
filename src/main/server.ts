import { pgHelper } from "../app/shared/database/pg-helper";
import { redisHelper } from "../app/shared/database/redis-helper";
import app from "./config/app";

pgHelper
    .connect()
    .then(() => {
        redisHelper.connect();
        app.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado'));
    })
    .catch((err) => console.log(err));