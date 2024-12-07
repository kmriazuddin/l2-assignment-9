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

export const AuthController = {
  userLogin,
};
