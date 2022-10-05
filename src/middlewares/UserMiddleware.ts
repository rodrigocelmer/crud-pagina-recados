import { NextFunction, Request, Response } from "express";

export class UserMiddleware {
    validateUserBody(request: Request, response: Response, next: NextFunction){
        const {name} = request.body;

        if(!name)
            return response.status(404).json({err: '\'name\' field not informed'});

        return next();
    }
}