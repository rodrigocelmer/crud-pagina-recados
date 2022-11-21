import { UserEntity } from "../database/entities/user.entity";
import { pgHelper } from "../database/pg-helper";
import { User } from "../model/User";

export class UserRepository{
    async create(user: User): Promise<void>{
        const manager = pgHelper.client.manager;
        const userEntity = manager.create(UserEntity, {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email
        })

        await manager.save(userEntity);
    }

    async getAll(): Promise<UserEntity[]>{
        const manager = pgHelper.client.manager;
        const userEntity: UserEntity[] = await manager.find(UserEntity);

        return userEntity;
    }
}