import { UserRepository } from "../repositories/user.repository";

export class RemoveUser {
    private _userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this._userRepository = userRepository;
    }

    async execute(id: string){
        await this._userRepository.remove(id);
    }
}