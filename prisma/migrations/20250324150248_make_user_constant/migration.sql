/*
  Warnings:

  - Made the column `userId` on table `user_contacts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `user_jobs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `user_projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `user_socials` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `user_stacks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user_contacts" DROP CONSTRAINT "user_contacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_jobs" DROP CONSTRAINT "user_jobs_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_projects" DROP CONSTRAINT "user_projects_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_socials" DROP CONSTRAINT "user_socials_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_stacks" DROP CONSTRAINT "user_stacks_userId_fkey";

-- AlterTable
ALTER TABLE "user_contacts" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_jobs" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_projects" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_socials" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "user_stacks" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_socials" ADD CONSTRAINT "user_socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_jobs" ADD CONSTRAINT "user_jobs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stacks" ADD CONSTRAINT "user_stacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
