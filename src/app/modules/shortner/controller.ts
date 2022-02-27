import { Request, Response, NextFunction } from "express";
import * as services from './services';

export const encode = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).json(await services.encode(req.body));
    } catch (error) {
        next(error);
    }
}

export const decode = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).json(await services.decode({ url: req.query.url.toString() }));
    } catch (error) {
        next(error);
    }
}

export const statistic = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(200).json(await services.statistic(req.params.path));
    } catch (error) {
        next(error);
    }
}
