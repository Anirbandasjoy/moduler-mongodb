import { Router } from "express";
import { Collection } from "mongodb";
import { userController } from "../controller/user.controller";

const userRouter = (user: Collection) => {
  const router = Router();
  const { createUser, findAllUsers } = userController(user);

  router.post("/create", createUser);
  router.get("/find", findAllUsers);

  return router;
};

export default userRouter;
