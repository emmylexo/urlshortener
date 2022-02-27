import { Router } from "express";
import { joiValidator } from "iyasunday";
import * as controller from './controller';
import validation from './validation';

const route = Router();

route.post(
    "/encode",
    joiValidator(validation.encode),
    controller.encode
);

route.get(
    "/decode",
    joiValidator(validation.decode),
    controller.decode
);

route.get(
    "/statistic/:path",
    joiValidator(validation.statistics),
    controller.statistic
);
export default route;