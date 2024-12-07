import jwt from "jsonwebtoken";
import config from "../../config";

export const tokenGenerator = (data: { userEmail: string; role: string }) => {
  const token = jwt.sign(data, config.jwt.jwt_secret as string, {
    expiresIn: config.jwt.expire_in,
  });
  return token;
};
