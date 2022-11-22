import { MessageEntity } from "../database/entities/message.entity";
import { pgHelper } from "../database/pg-helper";
import { Message } from "../model/Message";

export class MessageRepository{
    async create(userId: string, message: Message): Promise<void>{
        const manager = pgHelper.client.manager;
        const messageEntity = manager.create(MessageEntity, {
            id: message.id,
            description: message.description,
            detail: message.detail,
            archieved: message.archieved,
            userId
        })

        await manager.save(messageEntity);
    }

    async getAll(userId: string): Promise<MessageEntity[]>{
        const manager = pgHelper.client.manager;
        const messageEntity = await manager.find(MessageEntity, {
            where: {userId}
        });

        return messageEntity;
    }

    async getById(msgId: string): Promise<MessageEntity>{
        const manager = pgHelper.client.manager;
        const messageEntity = await manager.findOne(MessageEntity, {
            where: {id: msgId}
        }) as MessageEntity;

        return messageEntity;
    }

    async remove(msgId: string): Promise<void>{
        const manager = pgHelper.client.manager;

        await manager.delete(MessageEntity, {id: msgId});
    }

    async update(userId: string, message: Message): Promise<void>{
        const manager = pgHelper.client.manager;
        await manager.update(MessageEntity, {id: message.id},
        {   
            description: message.description,
            detail: message.detail,
            archieved: message.archieved,
            userId
        });
    }
}