import { Router } from "express";
import { RatingController } from "./rating.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/add-rating", auth("CUSTOMER"), RatingController.addRating);

router.get(
  "/get-rating-by-shop",
  auth("VENDOR"),
  RatingController.getUserRatingByShop
);

router.patch("/reply", auth("VENDOR"), RatingController.replyToReview);

export const ratingRouter = router;
