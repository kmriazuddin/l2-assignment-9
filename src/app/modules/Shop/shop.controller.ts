import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../utils/tryCatch";
import { ShopService } from "./shop.service";

const createShop = catchAsync(async (req, res) => {
  const result = await ShopService.createShop(req.body, req.user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop Created Successfully",
    data: result,
  });
});

//for user
const getAllVendorShop = catchAsync(async (req, res) => {
  const paginationData = pick(req.query, ["page", "limit", "sort"]);
  const result = await ShopService.getAllVendorShop(paginationData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All Shop are fetched Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleVendorShop = catchAsync(async (req, res) => {
  const result = await ShopService.getSingleVendorShop(req.params?.id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop is fetched Successfully",
    data: result,
  });
});

//for vendor
const getVendorShop = catchAsync(async (req, res) => {
  const result = await ShopService.getVendorShop(req.user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop are fetched Successfully",
    data: result,
  });
});

const getVendorSingleShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShopService.getVendorSingleShop(req.user, id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop data is fetched Successfully",
    data: result,
  });
});

const blockShop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ShopService.blockShop(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Shop active status changed.",
    data: result,
  });
});

export const ShopController = {
  createShop,
  getVendorShop,
  getVendorSingleShop,
  getAllVendorShop,
  getSingleVendorShop,
  blockShop,
};
