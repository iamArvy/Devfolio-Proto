/*
  Warnings:

  - You are about to drop the column `apiCredentialId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_apiCredentialId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "apiCredentialId",
ADD COLUMN     "clientId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_clientId_key" ON "users"("clientId");
