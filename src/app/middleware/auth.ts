import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import prisma from "../../shared/prisma";
import { AppError } from "../errors/appError";
import catchAsync from "../utils/tryCatch";

export type T_UserRole = "CUSTOMER" | "ADMIN" | "VENDOR" | "SUPERADMIN";
export const auth = (...userRole: T_UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenData = req.headers.authorization;

    const token = tokenData;

    if (!token) {
      throw new AppError(401, "You have no access to this route!");
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt.jwt_secret as string
      ) as JwtPayload;

      const { role, userEmail } = decoded as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (!user) {
        throw new AppError(401, "You have no access this route!");
      }

      if (userRole && !userRole.includes(role)) {
        throw new AppError(401, "You have no access this route");
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (error: any) {
      throw new AppError(401, "You have no access this route!");
    }
  });
};
