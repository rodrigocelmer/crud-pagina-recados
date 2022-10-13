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
        const msg = new Message(message._description, message._detail);
        msg._id = message._id;

        return msg;
    }

    toJson(){
        return {
            id: this._id,
            description: this._description,
            detail: this._detail
        }
    }
}