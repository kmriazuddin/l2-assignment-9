import { Router } from "express";
import { OrderController } from "./order.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.get(
  "/single-order/:id",
  auth("CUSTOMER", "ADMIN", "SUPERADMIN", "VENDOR"),
  OrderController.getSingleOrder
);

router.get(
  "/my-order",
  auth("CUSTOMER"),
  OrderController.getSingleCustomerAllOrder
);

router.get(
  "/pending-order",
  auth("ADMIN", "SUPERADMIN"),
  OrderController.getPendingOrder
);
router.get(
  "/shop-order/:id",
  auth("VENDOR"),
  OrderController.getSpecificShopOrder
);

router.post("/make-payment", auth("CUSTOMER"), OrderController.orderProduct);

router.get(
  "/all-orders",
  auth("ADMIN", "SUPERADMIN"),
  OrderController.getAllOrder
);

router.patch(
  "/update/:id",
  auth("ADMIN", "SUPERADMIN"),
  OrderController.updateOrder
);

export const orderRouter = router;
