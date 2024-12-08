import express from "express";
import { userRouter } from "../modules/User/user.routes";
import { authRouter } from "../modules/Auth/auth.route";
import { shopRouter } from "../modules/Shop/shop.route";
import { categoryRouter } from "../modules/Category/category.route";
import { productRouter } from "../modules/Product/product.route";

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
  {
    path: "/category",
    route: categoryRouter,
  },
  {
    path: "/shop",
    route: shopRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
