import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/appError";

const followShop = async (
  id: string,
  user: JwtPayload & { userEmail: string; role: string }
) => {
  const userData = await prisma.customer.findUnique({
    where: { email: user.userEmail },
  });
  if (!userData) {
    throw new AppError(404, "Shop not listed to follow list.Try again.");
  }

  const result = await prisma.follower.create({
    data: { customerId: userData?.customerId, shopId: id },
  });

  return result;
};

const unFollowShop = async (
  id: string,
  user: JwtPayload & { userEmail: string; role: string }
) => {
  const userData = await prisma.customer.findUnique({
    where: { email: user.userEmail },
  });
  if (!userData) {
    throw new AppError(404, "Shop not listed to follow list.Try again.");
  }
  const result = await prisma.follower.delete({
    where: {
      shopId_customerId: {
        customerId: userData.customerId,
        shopId: id,
      },
    },
  });

  return result;
};

export const FollowerService = {
  followShop,
  unFollowShop,
};
