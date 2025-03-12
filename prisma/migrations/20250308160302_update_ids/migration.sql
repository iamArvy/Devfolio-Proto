/*
  Warnings:

  - The primary key for the `_ProjectToStack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `jobs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `socials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `socials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `stacks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `stacks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `jobId` column on the `stacks` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_ProjectToStack` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_ProjectToStack` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `userId` on table `stacks` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToStack" DROP CONSTRAINT "_ProjectToStack_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToStack" DROP CONSTRAINT "_ProjectToStack_B_fkey";

-- DropForeignKey
ALTER TABLE "stacks" DROP CONSTRAINT "stacks_jobId_fkey";

-- DropForeignKey
ALTER TABLE "stacks" DROP CONSTRAINT "stacks_userId_fkey";

-- AlterTable
ALTER TABLE "_ProjectToStack" DROP CONSTRAINT "_ProjectToStack_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_ProjectToStack_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "contacts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "jobs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "projects" DROP CONSTRAINT "projects_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "socials" DROP CONSTRAINT "socials_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "socials_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "stacks" DROP CONSTRAINT "stacks_pkey",
ADD COLUMN     "icon" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "jobId",
ADD COLUMN     "jobId" INTEGER,
ALTER COLUMN "userId" SET NOT NULL,
ADD CONSTRAINT "stacks_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "_ProjectToStack_B_index" ON "_ProjectToStack"("B");

-- AddForeignKey
ALTER TABLE "stacks" ADD CONSTRAINT "stacks_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stacks" ADD CONSTRAINT "stacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStack" ADD CONSTRAINT "_ProjectToStack_A_fkey" FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStack" ADD CONSTRAINT "_ProjectToStack_B_fkey" FOREIGN KEY ("B") REFERENCES "stacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
