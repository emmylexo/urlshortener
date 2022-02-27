import Express from "express";
import Routes from "./app/routes";
import Middleware from "./app/routes/middleware";


const app = Express();

Middleware(app);
Routes(app);


(async () => {
    app.listen(process.env.PORT, () => {
        console.log(`App connected on port ${process.env.PORT}`)
    })
})();

export default app;