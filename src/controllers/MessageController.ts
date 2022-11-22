import { Request, Response } from "express";
import { Message } from "../model/Message";
import { User } from "../model/User";
import { MessageRepository } from "../repositories/message.repository";
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

    async getAll(request: Request, response: Response){
        const {userId} = request.params;
        const {description, archieved} = request.query;
        const repository = new MessageRepository();
        let allMessagesFound = (await repository.getAll(userId)).map(message => {
            return message;
        })

        if(description){
            allMessagesFound = allMessagesFound.filter(message => {
                return message.description.toLowerCase().includes(description.toString().toLowerCase());
            })
        }

        if(archieved !== 'true'){
            allMessagesFound = allMessagesFound.filter(message => {
                return !message.archieved;
            })
        }

        const resp = {
            userId,
            messages: allMessagesFound
        }

        return response.json(resp);
    }

    remove(request: Request, response: Response){
        const {userId, msgId} = request.params;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;
        const userMsgIndex = user.messages.findIndex(m => m.id === msgId);

        user.deleteMessage(userMsgIndex);
        saveUserSync(usersDB);

        return response.json({msg: 'message deleted'});
    }

    update(request: Request, response: Response){
        const {userId, msgId} = request.params;
        const {description, detail} = request.body;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;
        const m = {id: msgId, description, detail} as Message;

        user.editMessage(m);
        saveUserSync(usersDB);

        return response.json({msg: 'message edited'});
    }

    changeStatus(request: Request, response: Response){        
        const {userId, msgId} = request.params;
        const {archieved} = request.body;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;

        user.changeMsgStatus(msgId, archieved);
        saveUserSync(usersDB);

        return response.json({msg: 'changed message status'});
    }
}