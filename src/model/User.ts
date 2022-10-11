import crypto from 'crypto';
import { Message } from './Message';

export class User {
    private _id: string;
    public get id() : string {
        return this._id;
    }

    private _name: string;
    public get name() : string {
        return this._name;
    }

    private _messages: Message[];
    public get messages() : Message[] {
        return [...this._messages];
    }
        
    constructor(name: string){
        this._id = crypto.randomUUID();
        this._name = name;
        this._messages = [];
    }

    static fill(id: string, name: string): User{
        const user = new User(name);
        user._id = id;

        return user;
    }

    toJson(){
        return{
            id: this._id,
            name: this._name
        }
    }
}