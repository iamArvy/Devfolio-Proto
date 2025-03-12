/*
  Warnings:

  - You are about to drop the column `clientId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apiCredentialId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_clientId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clientId",
ADD COLUMN     "apiCredentialId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_apiCredentialId_key" ON "users"("apiCredentialId");
