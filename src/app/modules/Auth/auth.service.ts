import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/appError";
import { tokenGenerator } from "../../utils/tokenGenerate";

const userLogin = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError(404, "Check your email!");
  }

  if (!(await bcrypt.compare(data.password, user.password))) {
    throw new AppError(404, "Check your password!");
  }

  const token = tokenGenerator({ userEmail: user.email, role: user.role });

  if (!token) {
    throw new AppError(404, "Something Went Wrong!");
  }

  return { token };
};

export const AuthService = {
  userLogin,
};
