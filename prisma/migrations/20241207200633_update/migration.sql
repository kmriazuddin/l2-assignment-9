/*
  Warnings:

  - You are about to alter the column `name` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "follower" DROP CONSTRAINT "follower_customerId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "shop" DROP CONSTRAINT "shop_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "vendors" DROP CONSTRAINT "vendors_userId_fkey";

-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "mobile" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "verificationToken" SET DEFAULT 'token will add letter';

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "vendors";

-- CreateTable
CREATE TABLE "customer" (
    "customerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "userId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "GENDER",
    "mobile" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "vendor" (
    "vendorId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image" TEXT,
    "address" TEXT NOT NULL,
    "mobile" INTEGER NOT NULL,
    "gender" "GENDER",
    "userId" TEXT NOT NULL,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("vendorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_customerId_key" ON "customer"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_userId_key" ON "customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_vendorId_key" ON "vendor"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_email_key" ON "vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_userId_key" ON "vendor"("userId");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop" ADD CONSTRAINT "shop_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendor"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follower" ADD CONSTRAINT "follower_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
