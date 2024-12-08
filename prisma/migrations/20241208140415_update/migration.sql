-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DEFAULT 'https://i.ibb.co.com/GvsyLqQ/user.png';

-- AlterTable
ALTER TABLE "category" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DEFAULT 'https://i.ibb.co.com/GvsyLqQ/user.png';

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "shop" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "vendor" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DEFAULT 'https://i.ibb.co.com/GvsyLqQ/user.png';
