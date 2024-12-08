import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { AppError } from "../../errors/appError";
import { tokenGenerator } from "../../utils/tokenGenerate";
import { sendMail } from "../../utils/nodeMailer";

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

const userResetPassLinkGenerate = async (userEmail: string) => {
  const findUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  if (!findUser) {
    throw new AppError(500, "User not found");
  }

  const accessToken = tokenGenerator(
    {
      userEmail: userEmail,
      role: "",
    },
    "5min"
  );

  await sendMail({
    to: userEmail,
    subject: "Reset pass link",
    text: "Change your pass within 5min",
    html: `<a href="http://localhost:3000/reset-password?email=${userEmail}&token=${accessToken}">Reset Link</a>
  <p>Change your pass within 5min</p>`,
  });

  return "";
};

export const AuthService = {
  userLogin,
  userResetPassLinkGenerate,
};
