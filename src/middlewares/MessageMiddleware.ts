import { NextFunction, Request, Response } from "express";

export class MessageMiddleware {
    validateBody(request: Request, response: Response, next: NextFunction){
        const {description, detail} = request.body;

        if(!description)
            return response.status(404).json({err: '\'description\' field not informed'});

        if(!detail)
            return response.status(404).json({err: '\'detail\' field not informed'});

        return next();
    }
}