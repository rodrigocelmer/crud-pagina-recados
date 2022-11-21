import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/users.repository";

export class UserMiddleware {
    async validateId(request: Request, response: Response, next: NextFunction){
        const {userId} = request.params;
        const repository = new UserRepository();
        const user = await repository.getById(userId);

        if(!user)
            return response.status(404).json({err: 'user not found'});
        
        return next();
    }

    validateBody(request: Request, response: Response, next: NextFunction){
        const {name} = request.body;

        if(!name)
            return response.status(404).json({err: '\'name\' field not informed'});

        return next();
    }
}