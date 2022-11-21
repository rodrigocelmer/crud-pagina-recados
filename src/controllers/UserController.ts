import { Request, Response } from "express";
import { User } from "../model/User";
import { UserRepository } from "../repositories/users.repository";
import { getUserSync, saveUserSync } from "../util/UserFileSystem";

export class UserController {
    create(request: Request, response: Response){
        const {name, password, email} = request.body;
        const user = new User(name, password, email);
        const usersDB = getUserSync();

        usersDB.push(user);
        saveUserSync(usersDB);

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

    remove(request: Request, response: Response){
        const {userId} = request.params;
        const usersDB = getUserSync();
        const userIndex = usersDB.findIndex(u => u.id === userId);

        usersDB.splice(userIndex, 1);
        saveUserSync(usersDB);

        return response.json({msg: 'user deleted'});
    }
}
