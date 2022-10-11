import { Express } from "express";
import { UserController } from "./controllers/UserController";
import { UserMiddleware } from "./middlewares/UserMiddleware";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));

    app.post(
        '/users',
        new UserMiddleware().validateBody,
        new UserController().create
    );
    app.get(
        '/users',
        new UserController().getAll
    );
    app.delete(
        '/users/:userId',
        new UserMiddleware().validateUserId,
        new UserController().remove
    );
}