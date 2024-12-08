import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/tryCatch";
import { OrderService } from "./order.service";
import sendResponse from "../../../shared/sendResponse";
import { pick } from "../../../shared/pick";

const orderProduct = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIntoDB(
    req.body,
    req.user as JwtPayload & { role: string; userEmail: string }
  );
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Order placed successfully",
  });
});
const getSingleCustomerAllOrder = catchAsync(async (req, res) => {
  const paginationData = pick(req.query, ["page", "limit", "sort"]);

  const result = await OrderService.getSingleCustomerAllOrder(
    req.user as JwtPayload & { role: string; userEmail: string },
    paginationData
  );

  sendResponse(res, {
    data: result.data,
    meta: result.meta,
    statusCode: 200,
    success: true,
    message: "Orders are fetched successfully",
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.getSingleOrder(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Orders is fetched successfully",
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const paginationData = pick(req.query, ["page", "limit", "sort"]);
  const result = await OrderService.getAllOrder(paginationData);
  sendResponse(res, {
    meta: result.meta,
    data: result.data,
    statusCode: 200,
    success: true,
    message: "All Orders are fetched successfully",
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const result = await OrderService.updateOrder(req.params.id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Orders is updated successfully",
  });
});

const getPendingOrder = catchAsync(async (req, res) => {
  const paginationData = pick(req.query, ["page", "limit", "sort"]);
  const result = await OrderService.getPendingOrder(paginationData);
  sendResponse(res, {
    meta: result.meta,
    data: result.data,
    statusCode: 200,
    success: true,
    message: "Pending Orders are fetched successfully",
  });
});

const getSpecificShopOrder = catchAsync(async (req, res) => {
  const paginationData = pick(req.query, ["page", "limit", "sort"]);
  const result = await OrderService.getSpecificShopOrder(
    req.params.id,
    paginationData
  );
  sendResponse(res, {
    data: result.data,
    meta: result.meta,
    statusCode: 200,
    success: true,
    message: "Shop Orders are fetched successfully",
  });
});

export const OrderController = {
  orderProduct,
  getSpecificShopOrder,
  getSingleCustomerAllOrder,
  getSingleOrder,
  getPendingOrder,
  getAllOrder,
  updateOrder,
};
