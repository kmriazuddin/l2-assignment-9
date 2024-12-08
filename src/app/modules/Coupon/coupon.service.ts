import prisma from "../../../shared/prisma";

const createCoupon = async (data: any) => {
  const result = await prisma.coupon.create({
    data: {
      ...data,
      discount: Number(data.discount),
      expiresAt: new Date(data.expiresAt),
    },
  });
  return result;
};

const getShopCoupon = async (shopId: string) => {
  const result = await prisma.coupon.findMany({ where: { shopId } });
  return result;
};

export const couponService = { createCoupon, getShopCoupon };
