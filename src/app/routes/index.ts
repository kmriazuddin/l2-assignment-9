import express from "express";
import { userRouter } from "../modules/User/user.routes";
import { authRouter } from "../modules/Auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
