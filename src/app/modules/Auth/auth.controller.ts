import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../utils/tryCatch";
import { AuthService } from "./auth.service";

const userLogin = catchAsync(async (req, res) => {
  const result = await AuthService.userLogin(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Login Successfully!",
    data: result,
  });
});

const resetPassLink = catchAsync(async (req, res) => {
  const userEmail = req.body.email;

  const result = await AuthService.userResetPassLinkGenerate(userEmail);

  sendResponse(res, {
    data: { token: result },
    statusCode: 200,
    success: true,
    message: "Reset link sent",
  });
});

export const AuthController = {
  userLogin,
  resetPassLink,
};
