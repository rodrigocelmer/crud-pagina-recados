import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";

export class UserValidator {
    async validateId(request: Request, response: Response, next: NextFunction){
        const {userId} = request.params;
        const repository = new UserRepository();
        const user = await repository.getById(userId);

        if(!user)
            return response.status(404).json({err: 'user not found'});
        
        return next();
    }

    validateBody(request: Request, response: Response, next: NextFunction){
        const {name, password, email} = request.body;

        if(!name)
            return response.status(404).json({err: '\'name\' field not informed'});

        if(!password)
            return response.status(404).json({err: '\'password\' field not informed'});
            
        if(!email)
            return response.status(404).json({err: '\'email\' field not informed'});

        return next();
    }
}