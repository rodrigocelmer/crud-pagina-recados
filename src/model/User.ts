import crypto from 'crypto';

export class User {
    private _id: string;
    public get id() : string {
        return this._id;
    }

    private _name: string;
    public get name() : string {
        return this._name;
    }
    
    constructor(name: string){
        this._id = crypto.randomUUID();
        this._name = name;
    }

    toJson(){
        return{
            id: this._id,
            name: this._name
        }
    }
}