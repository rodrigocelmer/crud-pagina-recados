import crypto from 'crypto';

export class Message{
    private _id: string;
    public get id() : string {
        return this._id;
    }

    private _description: string;
    public get description() : string {
        return this._description;
    }

    private _detail: string;
    public get detail() : string {
        return this._detail;
    }
    
    constructor(description: string, detail: string){
        this._id = crypto.randomUUID();
        this._description = description;
        this._detail = detail
    }
    
    static fill(message: Message): Message{
        const msg = new Message(message.description, message.detail);
        msg._id = message.id;

        return msg;
    }

    edit(message: Message){
        this._description = message.description;
        this._detail = message.detail;
    }

    toJson(){
        return {
            id: this._id,
            description: this._description,
            detail: this._detail
        }
    }
}