import { Request, Response } from "express";
import { Message } from "../model/Message";
import { getUserSync, saveUserSync } from "../util/UserFileSystem";

export class MessageController {
    create(request: Request, response: Response){
        const {userId} = request.params;
        const {description, detail} = request.body;
        const msg = new Message(description, detail);
        const usersDB = getUserSync();
        const userIndex = usersDB.findIndex(u => u.id === userId);

        console.log(usersDB[userIndex])

        usersDB[userIndex].addMessage(msg);
        saveUserSync(usersDB);

        console.log(usersDB[userIndex])

        return response.json(msg.toJson());
    }
}