import { Express } from "express";
import { UserController } from "./controllers/UserController";
import { UserMiddleware } from "./middlewares/UserMiddleware";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));

    app.post(
        '/users',
        new UserMiddleware().validateUserBody,
        new UserController().create
    )
}