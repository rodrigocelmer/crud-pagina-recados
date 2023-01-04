import { Message } from "../../../models/message";
import { MessageRepository } from "../repositories/message.repository";

interface RequestData {
    description: string;
    detail: string;
}

export class AddMessage {
    private _messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository){
        this._messageRepository = messageRepository;
    }

    async execute(userId: string, data: RequestData){
        const msg = new Message(data.description, data.detail);

        await this._messageRepository.create(userId, msg);

        return msg.toJson();
    }
}