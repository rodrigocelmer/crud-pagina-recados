import { Express } from "express";
import { MessageController } from "./controllers/MessageController";
import { UserController } from "./controllers/UserController";
import { MessageMiddleware } from "./middlewares/MessageMiddleware";
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
        new UserMiddleware().validateId,
        new UserController().remove
    );
    app.post(
        '/users/:userId/messages',
        new UserMiddleware().validateId,
        new MessageMiddleware().validateBody,
        new MessageController().create
    );
    app.get(
        '/users/:userId/messages',
        new MessageController().getAll
    )
}