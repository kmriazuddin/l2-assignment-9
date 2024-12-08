import { Router } from "express";
import { FollowerController } from "./follower.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/new-follow/:id", auth("CUSTOMER"), FollowerController.followShop);

router.delete(
  "/remove-follow/:id",
  auth("CUSTOMER"),
  FollowerController.unFollowShop
);

export const followRouter = router;
