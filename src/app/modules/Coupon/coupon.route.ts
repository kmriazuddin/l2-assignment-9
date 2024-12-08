import { Router } from "express";
import { auth } from "../../middleware/auth";
import { couponController } from "./coupon.controller";

const router = Router();

router.post("/create-coupon", auth("VENDOR"), couponController.createCoupon);

router.get(
  "/get-coupon/:id",
  auth("CUSTOMER", "VENDOR"),
  couponController.getShopCoupon
);

export const couponRouter = router;
