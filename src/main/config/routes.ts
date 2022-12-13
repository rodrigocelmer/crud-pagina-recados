import { Express } from "express";
import { MessageController } from "../../app/features/messages/controllers/message.controller";
import { UserController } from "../../app/features/users/controllers/user.controller";
import { MessageValidator } from "../../app/features/messages/validators/message.validator";
import { UserValidator } from "../../app/features/users/validators/user.validator";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));

    app.post(
        '/users',
        new UserValidator().validateBody,
        new UserController().create
    );
    app.get(
        '/users',
        new UserController().getAll
    );
    app.delete(
        '/users/:userId',
        new UserValidator().validateId,
        new UserController().remove
    );
    app.post(
        '/users/:userId/messages',
        new UserValidator().validateId,
        new MessageValidator().validateBody,
        new MessageController().create
    );
    app.get(
        '/users/:userId/messages',
        new UserValidator().validateId,
        new MessageController().getAll
    );
    app.delete(
        '/users/:userId/messages/:msgId',
        new UserValidator().validateId,
        new MessageValidator().validateId,
        new MessageController().remove
    );
    app.put(
        '/users/:userId/messages/:msgId',
        new UserValidator().validateId,
        new MessageValidator().validateId,
        new MessageValidator().validateBody,
        new MessageController().update
    )
    app.post(
        '/users/:userId/messages/:msgId/changeStatus',
        new UserValidator().validateId,
        new MessageValidator().validateId,
        new MessageController().changeStatus
    )
}