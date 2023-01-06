import { Message } from "../../../models/message";
import { MessageRepository } from "../repositories/message.repository";

interface RequestData {
    id: string;
    description: string;
    detail: string;
}

export class UpdateMessage {
    private _messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository){
        this._messageRepository = messageRepository;
    }

    async execute(data: RequestData){
        const message = await this._messageRepository.getById(data.id);

        await this._messageRepository.update(data.id, data.description, data.detail);

        return Message.fill(
            message.id,
            message.description,
            message.detail,
            message.archieved
        )
    }
}