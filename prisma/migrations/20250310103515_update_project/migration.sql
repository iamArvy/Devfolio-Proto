/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `stacks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stacks_name_userId_key" ON "stacks"("name", "userId");
