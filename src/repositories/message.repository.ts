import { MessageEntity } from "../database/entities/message.entity";
import { pgHelper } from "../database/pg-helper";

export class MessageRepository{
    async getAll(userId: string): Promise<MessageEntity[]>{
        const manager = pgHelper.client.manager;
        const messageEntity = await manager.find(MessageEntity, {
            where: {userId}
        });

        return messageEntity;
    }
}