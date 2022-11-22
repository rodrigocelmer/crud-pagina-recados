import { Request, Response } from "express";
import { Message } from "../model/Message";
import { User } from "../model/User";
import { MessageRepository } from "../repositories/message.repository";
import { getUserSync, saveUserSync } from "../util/UserFileSystem";

export class MessageController {
    async create(request: Request, response: Response){
        const {userId} = request.params;
        const {description, detail} = request.body;
        const msg = new Message(description, detail);
        const repository = new MessageRepository();

        await repository.create(userId, msg);

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

    async remove(request: Request, response: Response){
        const {msgId} = request.params;
        const repository = new MessageRepository();

        await repository.remove(msgId);

        return response.json({msg: 'message deleted'});
    }

    async update(request: Request, response: Response){
        const {userId, msgId} = request.params;
        const {description, detail} = request.body;
        const toUpdate = Message.fill(msgId, description, detail);
        const repository = new MessageRepository();

        await repository.update(userId, toUpdate);

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