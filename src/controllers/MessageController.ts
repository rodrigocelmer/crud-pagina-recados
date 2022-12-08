import { Request, Response } from "express";
import { redisHelper } from "../database/redis-helper";
import { Message } from "../model/Message";
import { MessageRepository } from "../repositories/message.repository";

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

        await redisHelper.client.set(`messages:${userId}`, JSON.stringify(allMessagesFound));

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
        const {msgId} = request.params;
        const {description, detail} = request.body;
        const repository = new MessageRepository();

        await repository.update(msgId, description, detail);

        return response.json({msg: 'message edited'});
    }

    async changeStatus(request: Request, response: Response){        
        const {msgId} = request.params;
        const {archieved} = request.body;
        const repository = new MessageRepository();

        await repository.changeStatus(msgId, archieved);

        return response.json({msg: 'changed message status'});
    }
}