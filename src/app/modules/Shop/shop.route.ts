import { Router } from "express";
import { ShopController } from "./shop.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/create-shop", auth("VENDOR"), ShopController.createShop);

router.get("/", auth("VENDOR"), ShopController.getVendorShop);

router.get("/get-all-shop", ShopController.getAllVendorShop);

router.get("/get-single-shop/:id", ShopController.getSingleVendorShop);

router.get("/:id", auth("VENDOR"), ShopController.getVendorSingleShop);

router.patch(
  "/block-shop/:id",
  auth("ADMIN", "SUPERADMIN"),
  ShopController.blockShop
);

export const shopRouter = router;
