import { Request, Response, NextFunction } from "express";
import * as services from './services';

export const encode = async (
    req,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).json(await services.encode(req.body));
    } catch (error) {
        next(error);
    }
}
