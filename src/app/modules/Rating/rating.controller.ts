import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/tryCatch";
import { RatingService } from "./rating.service";
import sendResponse from "../../../shared/sendResponse";
import { pick } from "../../../shared/pick";

const addRating = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload & { userEmail: string; role: string };

  const result = await RatingService.addRating(req.body.data, user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rating added Successfully",
    data: result,
  });
});

const getUserRatingByShop = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload & { userEmail: string; role: string };
  const paginationData = pick(req.query, ["page", "limit", "sort"]);
  const result = await RatingService.getUserReviewByShop(user, paginationData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Rating is fetched by Shop",
    data: result.data,
    meta: result.meta,
  });
});

const replyToReview = catchAsync(async (req, res) => {
  const result = await RatingService.replyToReview(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Reply Given!",
    data: result,
  });
});

export const RatingController = {
  addRating,
  getUserRatingByShop,
  replyToReview,
};
