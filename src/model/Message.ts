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

    private _archieved: boolean;
    public get archieved() : boolean {
        return this._archieved;
    }
    
    constructor(description: string, detail: string){
        this._id = crypto.randomUUID();
        this._description = description;
        this._detail = detail;
        this._archieved = false;
    }
    
    static fill(id: string, description: string, detail: string, archieved?: boolean): Message{
        const msg = new Message(description, detail);
        msg._id = id;
        msg._archieved ? archieved : false;

        return msg;
    }

    edit(message: Message){
        this._description = message.description;
        this._detail = message.detail;
    }

    changeStatus(archieved: boolean){
        this._archieved = archieved;
    }

    toJson(){
        return {
            id: this._id,
            description: this._description,
            detail: this._detail,
            archieved: this._archieved
        }
    }
}