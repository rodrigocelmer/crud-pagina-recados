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

    private _password: string;
    public get password(): string {
        return this._password;
    }

    private _email: string;
    public get email(): string {
        return this._email;
    }
    
    private _messages: Message[];
    public get messages() : Message[] {
        return [...this._messages];
    }
        
    constructor(name: string, password: string, email: string){
        this._id = crypto.randomUUID();
        this._name = name;
        this._password = password;
        this._email = email;
        this._messages = [];
    }

    static fill(id: string, name: string, password: string, email: string, messages: Message[]): User{
        const user = new User(name, password, email);
        user._id = id;
        user._messages = messages.map(msg => Message.fill(msg))

        return user;
    }

    addMessage(message: Message){
        this._messages.push(message);
    }

    deleteMessage(index: number){
        this._messages.splice(index, 1);
    }

    editMessage(message: Message){
        const msg = this._messages.find(m => m.id === message.id) as Message;

        msg.edit(message);
    }

    changeMsgStatus(msgId: string, archieved: boolean){
        const msg = this._messages.find(m => m.id === msgId) as Message;

        msg.changeStatus(archieved);
    }

    toJson(){
        return{
            id: this._id,
            name: this._name,
            email: this._email
        }
    }

    toFileSystem(){
        return{
            id: this._id,
            name: this._name,
            messages: this._messages.map(msg => {
                return(
                    {
                        id: msg.id,
                        description: msg.description,
                        detail: msg.detail,
                        archieved: msg.archieved
                    }
                )
            })
        }
    }
}