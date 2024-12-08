import express from "express";
import { userRouter } from "../modules/User/user.routes";
import { authRouter } from "../modules/Auth/auth.route";
import { shopRouter } from "../modules/Shop/shop.route";
import { categoryRouter } from "../modules/Category/category.route";
import { productRouter } from "../modules/Product/product.route";
import { followRouter } from "../modules/Follower/follower.route";
import { orderRouter } from "../modules/Order/order.route";
import { paymentRouter } from "../modules/Order/Payment/payment.route";
import { ratingRouter } from "../modules/Rating/rating.route";
import { couponRouter } from "../modules/Coupon/coupon.route";
import { dashboardRouter } from "../modules/Dashboard/dashboard.route";

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
  {
    path: "/follower",
    route: followRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/payment",
    route: paymentRouter,
  },
  {
    path: "/rating",
    route: ratingRouter,
  },
  {
    path: "/coupon",
    route: couponRouter,
  },
  {
    path: "/dashboard",
    route: dashboardRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
