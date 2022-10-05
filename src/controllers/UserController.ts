import { Request, Response } from "express";
import { User } from "../model/User";
import fs from "fs";

export class UserController {
    create(request: Request, response: Response){
        const {name} = request.body;
        const user = new User(name);
        const usersDB = getUserSync();

        usersDB.push(user);
        saveUserSync(usersDB);

        return response.json(user.toJson());
    }

    getAll(request: Request, response: Response){
        const {name} = request.query;
        const usersDB = getUserSync();
        let allUsersFound = usersDB.map(user => {
            return user.toJson();
        })

        if(name){
            allUsersFound = allUsersFound.filter(user => {
                return user.name.toLowerCase().includes(name.toString().toLowerCase());
            })
        }

        return response.json(allUsersFound);
    }
}

/**
 *  FS functions
 */
const dbPath = 'db.json';

function getUserSync(): User[] {
    if(!fs.existsSync(dbPath)){
        return [];
    }

    const data = fs.readFileSync(dbPath);
    const userJSON = JSON.parse(data.toString()) as any[];

    return userJSON.map((user) =>
        User.fill(
            user.id,
            user.name
        )
    );
}

function saveUserSync(users: User[]): void {
    const dataJSON = JSON.stringify(
        users.map((user) => user.toJson())
    )

    fs.writeFileSync(dbPath, dataJSON);
}