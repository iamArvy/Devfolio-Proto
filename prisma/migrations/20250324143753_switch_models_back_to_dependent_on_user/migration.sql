/*
  Warnings:

  - You are about to drop the column `profileId` on the `user_contacts` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `user_jobs` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `user_projects` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `user_socials` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `user_stacks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `user_contacts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role,userId]` on the table `user_jobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `user_projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `user_socials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `user_stacks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "user_contacts" DROP CONSTRAINT "user_contacts_profileId_fkey";

-- DropForeignKey
ALTER TABLE "user_jobs" DROP CONSTRAINT "user_jobs_profileId_fkey";

-- DropForeignKey
ALTER TABLE "user_projects" DROP CONSTRAINT "user_projects_profileId_fkey";

-- DropForeignKey
ALTER TABLE "user_socials" DROP CONSTRAINT "user_socials_profileId_fkey";

-- DropForeignKey
ALTER TABLE "user_stacks" DROP CONSTRAINT "user_stacks_profileId_fkey";

-- DropIndex
DROP INDEX "user_contacts_name_profileId_key";

-- DropIndex
DROP INDEX "user_jobs_role_profileId_key";

-- DropIndex
DROP INDEX "user_projects_name_profileId_key";

-- DropIndex
DROP INDEX "user_socials_name_profileId_key";

-- DropIndex
DROP INDEX "user_stacks_name_profileId_key";

-- AlterTable
ALTER TABLE "user_contacts" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user_jobs" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user_projects" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user_socials" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "user_stacks" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_contacts_name_userId_key" ON "user_contacts"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_jobs_role_userId_key" ON "user_jobs"("role", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_projects_name_userId_key" ON "user_projects"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_socials_name_userId_key" ON "user_socials"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_stacks_name_userId_key" ON "user_stacks"("name", "userId");

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_socials" ADD CONSTRAINT "user_socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_jobs" ADD CONSTRAINT "user_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stacks" ADD CONSTRAINT "user_stacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
