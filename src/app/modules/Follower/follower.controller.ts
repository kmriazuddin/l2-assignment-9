import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/tryCatch";
import { FollowerService } from "./follower.service";
import sendResponse from "../../../shared/sendResponse";

const followShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user as JwtPayload & { userEmail: string; role: string };
  const result = await FollowerService.followShop(id, user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop followed successfully!",
    data: result,
  });
});

const unFollowShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user as JwtPayload & { userEmail: string; role: string };
  const result = await FollowerService.unFollowShop(id, user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop unfollow successfully!",
    data: result,
  });
});

export const FollowerController = {
  followShop,
  unFollowShop,
};
