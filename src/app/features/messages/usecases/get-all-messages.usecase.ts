import { MessageEntity } from "../../../shared/database/entities/message.entity";
import { MessageRepository } from "../repositories/message.repository";

export class GetAllMessages {
    private _messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this._messageRepository = messageRepository;
    }

    async execute(userId: string){
        let list: MessageEntity[] | null = null;

        if(!list){
            list = await this._messageRepository.getAll(userId);
        }

        return list;
    }
}