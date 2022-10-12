import { NextFunction, Request, Response } from "express";
import { User } from "../model/User";
import { getUserSync } from "../util/UserFileSystem";

export class MessageMiddleware {
    validateId(request: Request, response: Response, next: NextFunction){
        const {userId, msgId} = request.params;
        const usersDB = getUserSync();
        const user = usersDB.find(u => u.id === userId) as User;
        const usgMsg = user.messages.find(m => m.id === msgId)

        if(!usgMsg)
            return response.status(404).json({err: 'message not found'});
        
        return next();
    }

    validateBody(request: Request, response: Response, next: NextFunction){
        const {description, detail} = request.body;

        if(!description)
            return response.status(404).json({err: '\'description\' field not informed'});

        if(!detail)
            return response.status(404).json({err: '\'detail\' field not informed'});

        return next();
    }
}