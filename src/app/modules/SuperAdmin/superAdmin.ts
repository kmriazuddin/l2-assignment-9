import { USER_ROLE } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import config from "../../../config";

const superUser = {
  email: "superadmin@gmail.com",
  password: "super123",
  role: USER_ROLE.SUPERADMIN,
};

const seedSuperAdmin = async () => {
  const hashedPass = await bcrypt.hash(
    superUser.password,
    Number(config.saltRound as string)
  );

  try {
    const isSuperAdminExists = await prisma.user.findFirst({
      where: { role: USER_ROLE.SUPERADMIN, email: superUser.email },
    });

    if (!isSuperAdminExists) {
      await prisma.user.create({
        data: { ...superUser, password: hashedPass },
      });
    } else {
      console.log("Super admin already exists!");
    }
  } catch (error) {
    console.error("Error seeding super admin:", error);
  }
};

export default seedSuperAdmin;
