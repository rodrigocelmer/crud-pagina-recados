import { UserEntity } from "../../../shared/database/entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class GetAllUsers {
    private _userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async execute(){
        let list: UserEntity[] | null = null;

        if(!list){
            list = await this._userRepository.getAll();
        }

        return list;
    }
}