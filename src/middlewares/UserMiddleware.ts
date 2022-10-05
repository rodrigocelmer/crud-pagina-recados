import { NextFunction, Request, Response } from "express";
import { getUserSync, saveUserSync } from "../util/UserFileSystem";

export class UserMiddleware {
    validateUserId(request: Request, response: Response, next: NextFunction){
        const {userId} = request.params;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId);

        if(!user)
            return response.status(404).json({err: 'user not found'});
        
        return next();
    }

    validateUserBody(request: Request, response: Response, next: NextFunction){
        const {name} = request.body;

        if(!name)
            return response.status(404).json({err: '\'name\' field not informed'});

        return next();
    }
}