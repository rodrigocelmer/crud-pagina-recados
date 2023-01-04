import { MessageEntity } from "../../../shared/database/entities/message.entity";
import { pgHelper } from "../../../shared/database/pg-helper";
import { Message } from "../../../models/message";

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

    async getById(msgId: string): Promise<Message>{
        const manager = pgHelper.client.manager;
        const messageEntity = await manager.findOne(MessageEntity, {
            where: {id: msgId}
        }) as MessageEntity;

        const message = Message.fill(
            messageEntity.id,
            messageEntity.description,
            messageEntity.detail,
            messageEntity.archieved
        )

        return message;
    }

    async remove(msgId: string): Promise<void>{
        const manager = pgHelper.client.manager;

        await manager.delete(MessageEntity, {id: msgId});
    }

    async update(msgId: string, description: string, detail: string): Promise<void>{
        const manager = pgHelper.client.manager;
        await manager.update(MessageEntity, {id: msgId},
        {   
            description,
            detail
        });
    }

    async changeStatus(msgId: string, newStatus: boolean): Promise<void>{
        const manager = pgHelper.client.manager;
        await manager.update(MessageEntity, {id: msgId},
        {   
            archieved: newStatus
        });
    }
}