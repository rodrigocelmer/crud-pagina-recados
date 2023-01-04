import { UserRepository } from "../repositories/user.repository";
import { User } from "../../../models/user";

interface RequestData {
    name: string;
    password: string;
    email: string;
}

export class CreateUser {
    private _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async execute(data: RequestData){
        const user = new User(data.name, data.password, data.email);

        await this._userRepository.create(user);

        return user.toJson();
    }
}