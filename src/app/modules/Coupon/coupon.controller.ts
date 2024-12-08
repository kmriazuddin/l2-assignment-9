import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../utils/tryCatch";
import { couponService } from "./coupon.service";

const createCoupon = catchAsync(async (req, res) => {
  const result = await couponService.createCoupon(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Coupon created successfully",
    data: result,
  });
});

const getShopCoupon = catchAsync(async (req, res) => {
  const result = await couponService.getShopCoupon(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop coupon fetch successfully",
    data: result,
  });
});

export const couponController = {
  createCoupon,
  getShopCoupon,
};
