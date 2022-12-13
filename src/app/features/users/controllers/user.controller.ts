import { Request, Response } from "express";
import { User } from "../../../models/user";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
    async create(request: Request, response: Response){
        const {name, password, email} = request.body;
        const user = new User(name, password, email);
        const repository = new UserRepository();

        await repository.create(user);

        return response.json(user.toJson());
    }

    async getAll(request: Request, response: Response){
        const {name} = request.query;
        const repository = new UserRepository();
        let allUsersFound = (await repository.getAll()).map(user => {
            return user;
        })

        if(name){
            allUsersFound = allUsersFound.filter(user => {
                return user.name.toLowerCase().includes(name.toString().toLowerCase());
            })
        }

        return response.json(allUsersFound);
    }

    async remove(request: Request, response: Response){
        const {userId} = request.params;
        const repository = new UserRepository();

        await repository.remove(userId);

        return response.json({msg: 'user deleted'});
    }
}
