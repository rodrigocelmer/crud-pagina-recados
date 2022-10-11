import { Request, Response } from "express";
import { Message } from "../model/Message";
import { User } from "../model/User";
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

    getAll(request: Request, response: Response){
        const {userId} = request.params;
        const {description, detail} = request.query;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;
        let allMessagesFound = user.messages.map(user => {
            return user.toJson();
        })

        // if(name){
        //     allUsersFound = allUsersFound.filter(user => {
        //         return user.name.toLowerCase().includes(name.toString().toLowerCase());
        //     })
        // }

        return response.json(allMessagesFound);
    }
}