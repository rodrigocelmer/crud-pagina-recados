import { MessageRepository } from "../repositories/message.repository";

export class RemoveMessage {
    private _messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository){
        this._messageRepository = messageRepository;
    }

    async execute(msgId: string){
        await this._messageRepository.remove(msgId);
    }
}