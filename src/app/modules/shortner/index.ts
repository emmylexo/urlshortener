import { Router } from "express";
import { joiValidator } from "iyasunday";
import * as controller from './controller';

const route = Router();

route.post(
    "/encode",
    controller.encode
);

export default route;