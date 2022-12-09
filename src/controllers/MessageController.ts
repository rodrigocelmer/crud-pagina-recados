import { Request, Response } from "express";
import { MessageEntity } from "../database/entities/message.entity";
import { redisHelper } from "../database/redis-helper";
import { Message } from "../model/Message";
import { MessageRepository } from "../repositories/message.repository";

async function clearCache(userId: string, msgId: string | undefined){
    await redisHelper.client.del(`messages:${userId}`);
    if(msgId){
        await redisHelper.client.del(`users:${userId}:messages:${msgId}`)
    }
}
export class MessageController {
    async create(request: Request, response: Response){
        const {userId} = request.params;
        const {description, detail} = request.body;
        const msg = new Message(description, detail);
        const repository = new MessageRepository();

        await repository.create(userId, msg);

        await redisHelper.client.setex(
            `users:${userId}:messages:${msg.id}`,
            (60*60),
            JSON.stringify(msg)
        );

        await clearCache(userId, undefined);

        return response.json(msg.toJson());
    }

    async getAll(request: Request, response: Response){
        const {userId} = request.params;
        const {description, archieved} = request.query;
        const cache = await redisHelper.client.get(`messages:${userId}`);
        let allMessagesFound: MessageEntity[];

        if(cache){
            allMessagesFound = JSON.parse(cache);
        }
        else{
            const repository = new MessageRepository();
            allMessagesFound = (await repository.getAll(userId)).map(message => {
                return message;
            })
        }

        await redisHelper.client.setex(
            `messages:${userId}`,
            (60*60),
            JSON.stringify(allMessagesFound)
        );

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
        const {userId, msgId} = request.params;
        const repository = new MessageRepository();

        await repository.remove(msgId);
        await clearCache(userId, msgId);

        return response.json({msg: 'message deleted'});
    }

    async update(request: Request, response: Response){
        const {userId, msgId} = request.params;
        const {description, detail} = request.body;
        const repository = new MessageRepository();

        await repository.update(msgId, description, detail);
        await clearCache(userId, msgId);

        return response.json({msg: 'message edited'});
    }

    async changeStatus(request: Request, response: Response){        
        const {userId, msgId} = request.params;
        const {archieved} = request.body;
        const repository = new MessageRepository();

        await repository.changeStatus(msgId, archieved);
        await clearCache(userId, msgId);

        return response.json({msg: 'changed message status'});
    }
}