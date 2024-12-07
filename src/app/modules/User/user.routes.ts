import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post("/create-user", UserController.createUser);

router.get("/", auth("SUPERADMIN"), UserController.getAllUser);

router.patch(
  "/block/:id",
  auth("SUPERADMIN", "ADMIN"),
  UserController.blockUser
);

router.patch(
  "/delete/:id",
  auth("SUPERADMIN", "ADMIN"),
  UserController.deleteUser
);

export const userRouter = router;
