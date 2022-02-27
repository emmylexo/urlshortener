import { Application } from "express";
import { errorMessage } from "iyasunday";

export default (app: Application): void => {
    const apiVersion: string = '/v1';
    // app.use(apiVersion, Auth);


    app.use((err, req, res, next) => {
        if (err) {
            res.status(err.httpStatusCode || 400).json(errorMessage(err));
            return res.end();
        }
        return next();
    });

    app.use((req, res, next) => {
        res.status(404).json({
            message: "Requested route not found",
            service: process.env.APP_NAME,
        });
    });
};