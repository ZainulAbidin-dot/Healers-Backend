-- CreateEnum
CREATE TYPE "_Role" AS ENUM ('user', 'admin', 'doctor', 'moderator');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "_Role"[] DEFAULT ARRAY['user']::"_Role"[];

-- CreateTable
CREATE TABLE "UserRole" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);
