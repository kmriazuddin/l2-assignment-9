import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../utils/tryCatch";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Created Successfully",
    data: result,
  });
});

const setNewPassword = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await UserService.setUserNewPassword(
    data?.token,
    data?.password
  );

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: "Password Updated Successfully",
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const paginationData = pick(req.query, ["page", "limit", "sort"]);
  const filter = pick(req.query, ["searchTerm", "isBlocked"]);

  const result = await UserService.getAllUser(paginationData, filter);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All user are fetched successfully",
    data: result,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const result = await UserService.userBlock(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Status Changed!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const result = await UserService.userDelete(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User delete status Changed",
    data: result,
  });
});

export const UserController = {
  createUser,
  setNewPassword,
  getAllUser,
  blockUser,
  deleteUser,
};
