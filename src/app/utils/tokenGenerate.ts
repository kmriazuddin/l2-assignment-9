import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { AppError } from "../errors/appError";

export const tokenGenerator = (
  data: { userEmail: string; role: string },
  expiresIn = config.jwt.expire_in
) => {
  const token = jwt.sign(data, config.jwt.jwt_secret as string, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(
      token,
      config.jwt.jwt_secret as string
    ) as JwtPayload;
    return decoded;
  } catch (error) {
    // Handle JWT-specific errors
    throw new AppError(401, "Invalid or expired token");
  }
};
