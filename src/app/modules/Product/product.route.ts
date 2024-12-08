import { Router } from "express";
import { ProductController } from "./product.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/add-product", auth("VENDOR"), ProductController.addProduct);

router.post("/clone-product", auth("VENDOR"), ProductController.cloneProduct);

router.get("/", ProductController.allProduct);

router.post("/flash-sale", ProductController.flashProduct);

router.get("/:id", ProductController.singleProduct);

router.patch("/:id", auth("VENDOR"), ProductController.updateProduct);

router.delete("/:id", auth("VENDOR"), ProductController.deleteProduct);

export const productRouter = router;
