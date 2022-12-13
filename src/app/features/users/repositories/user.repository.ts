import { UserEntity } from "../../../shared/database/entities/user.entity";
import { pgHelper } from "../../../shared/database/pg-helper";
import { User } from "../../../models/user";

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

    async getById(userId: string): Promise<UserEntity>{
        const manager = pgHelper.client.manager;
        const userEntity = await manager.findOne(UserEntity, {
            where: {id: userId}
        }) as UserEntity;

        return userEntity;
    }

    async remove(userId: string): Promise<void>{
        const manager = pgHelper.client.manager;
        await manager.delete(UserEntity, {id: userId})
    }
}