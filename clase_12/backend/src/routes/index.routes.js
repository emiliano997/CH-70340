import { Router } from "express";

import { userRouter } from "./user.routes.js";
import { orderRouter } from "./order.routes.js";
import { bussinessRouter } from "./bussiness.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/bussiness", bussinessRouter);

export default router;
