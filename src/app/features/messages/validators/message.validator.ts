import { NextFunction, Request, Response } from "express";
import { MessageRepository } from "../repositories/message.repository";

export class MessageValidator {
    async validateId(request: Request, response: Response, next: NextFunction){
        const {msgId} = request.params;
        const repository = new MessageRepository();
        const userMsg = await repository.getById(msgId);

        if(!userMsg)
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