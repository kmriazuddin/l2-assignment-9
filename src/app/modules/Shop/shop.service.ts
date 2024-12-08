import { JwtPayload } from "jsonwebtoken";
import { paginationHelper } from "../../utils/paginationHelper";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/appError";
import { IPaginationOptions } from "../../../shared/pagination.interface";

const createShop = async (
  data: {
    name: string;
    location: string;
  },
  user: JwtPayload
) => {
  const userData = await prisma.vendor.findUnique({
    where: { email: user?.userEmail },
  });

  if (!userData) {
    throw new AppError(404, "Failed to create Shop. User not found.");
  }

  const result = await prisma.shop.create({
    data: { ...data, vendorId: userData.vendorId },
  });
  return result;
};
// for all
const getAllVendorShop = async (paginationData: IPaginationOptions) => {
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginationData);
  const result = await prisma.shop.findMany({
    include: { vendor: true, followers: true },
    skip: skip,
    take: limit,
    orderBy: paginationData?.sort
      ? {
          [paginationData.sort.split("-")[0]]:
            paginationData.sort.split("-")[1],
        }
      : {
          createdAt: "desc",
        },
  });
  const total = await prisma.shop.count();

  return {
    meta: { page, limit, total, totalPage: Math.ceil(total / limit) },
    data: result,
  };
};

const getSingleVendorShop = async (id: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      shopId: id,
    },
    include: {
      products: { include: { category: true } },
      followers: { include: { customer: { select: { email: true } } } },
    },
  });

  return result;
};

//for vendor
const getVendorShop = async (user: JwtPayload) => {
  const userData = await prisma.vendor.findUnique({
    where: { email: user?.userEmail },
  });

  const result = await prisma.shop.findMany({
    where: { vendorId: userData?.vendorId },
  });

  return result;
};

const getVendorSingleShop = async (user: JwtPayload, id: string) => {
  const data = await prisma.vendor.findUniqueOrThrow({
    where: { email: user?.userEmail },
  });
  const result = await prisma.shop.findFirst({
    where: { shopId: id, vendorId: data.vendorId },
    include: { products: { include: { category: true } } },
  });

  return result;
};

const blockShop = async (id: string) => {
  const previous = await prisma.shop.findUnique({
    where: {
      shopId: id,
    },
  });
  const result = await prisma.shop.update({
    where: { shopId: id },
    data: { isBlackListed: !previous?.isBlackListed },
  });
  return result;
};

export const ShopService = {
  createShop,
  getVendorShop,
  getVendorSingleShop,
  getAllVendorShop,
  getSingleVendorShop,
  blockShop,
};
