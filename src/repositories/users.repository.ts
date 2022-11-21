import { UserEntity } from "../database/entities/user.entity";
import { pgHelper } from "../database/pg-helper";

export class UserRepository{
    async getAll(): Promise<UserEntity[]>{
        const manager = pgHelper.client.manager;
        const userEntity: UserEntity[] = await manager.find(UserEntity);

        return userEntity;
    }
}