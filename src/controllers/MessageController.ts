import { Request, Response } from "express";
import { Message } from "../model/Message";
import { User } from "../model/User";
import { getUserSync, saveUserSync } from "../util/UserFileSystem";

export class MessageController {
    create(request: Request, response: Response){
        const {userId} = request.params;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;
        const {description, detail} = request.body;
        const msg = new Message(description, detail);

        user.addMessage(msg);
        saveUserSync(usersDB);

        return response.json(msg.toJson());
    }

    getAll(request: Request, response: Response){
        const {userId} = request.params;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;
        const {description, detail} = request.query;
        let allMessagesFound = user.messages.map(messages => {
            return messages.toJson();
        })

        // if(name){
        //     allUsersFound = allUsersFound.filter(user => {
        //         return user.name.toLowerCase().includes(name.toString().toLowerCase());
        //     })
        // }

        return response.json(allMessagesFound);
    }

    remove(request: Request, response: Response){
        const {userId, msgId} = request.params;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;
        const usgMsgIndex = user.messages.findIndex(m => m.id === msgId)

        usersDB.splice(usgMsgIndex, 1);
        saveUserSync(usersDB);

        return response.json({msg: 'message deleted'});
    }
}