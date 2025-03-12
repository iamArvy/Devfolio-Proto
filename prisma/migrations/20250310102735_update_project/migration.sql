/*
  Warnings:

  - You are about to drop the column `location` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "location";
