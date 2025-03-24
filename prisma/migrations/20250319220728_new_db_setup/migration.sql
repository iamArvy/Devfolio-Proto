/*
  Warnings:

  - You are about to drop the column `about` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `socials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stacks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToStack" DROP CONSTRAINT "_ProjectToStack_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToStack" DROP CONSTRAINT "_ProjectToStack_B_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userId_fkey";

-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_userId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_userId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_jobId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_userId_fkey";

-- DropForeignKey
ALTER TABLE "socials" DROP CONSTRAINT "socials_userId_fkey";

-- DropForeignKey
ALTER TABLE "stacks" DROP CONSTRAINT "stacks_jobId_fkey";

-- DropForeignKey
ALTER TABLE "stacks" DROP CONSTRAINT "stacks_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "about",
DROP COLUMN "image",
DROP COLUMN "name";

-- DropTable
DROP TABLE "clients";

-- DropTable
DROP TABLE "contacts";

-- DropTable
DROP TABLE "jobs";

-- DropTable
DROP TABLE "projects";

-- DropTable
DROP TABLE "socials";

-- DropTable
DROP TABLE "stacks";

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT,
    "about" TEXT,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_contacts" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "icon" TEXT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_socials" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_jobs" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "value" TEXT,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stacks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "jobId" INTEGER,
    "icon" TEXT,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_stacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "live" TEXT,
    "repo" TEXT,
    "jobId" INTEGER,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_clients" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "secret" TEXT NOT NULL,

    CONSTRAINT "user_clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_contacts_name_profileId_key" ON "user_contacts"("name", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "user_socials_name_profileId_key" ON "user_socials"("name", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "user_jobs_role_key" ON "user_jobs"("role");

-- CreateIndex
CREATE UNIQUE INDEX "user_jobs_role_profileId_key" ON "user_jobs"("role", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "user_stacks_name_profileId_key" ON "user_stacks"("name", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "user_projects_name_profileId_key" ON "user_projects"("name", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "user_clients_userId_key" ON "user_clients"("userId");

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_socials" ADD CONSTRAINT "user_socials_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_jobs" ADD CONSTRAINT "user_jobs_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stacks" ADD CONSTRAINT "user_stacks_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "user_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_stacks" ADD CONSTRAINT "user_stacks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_projects" ADD CONSTRAINT "user_projects_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "user_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_clients" ADD CONSTRAINT "user_clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStack" ADD CONSTRAINT "_ProjectToStack_A_fkey" FOREIGN KEY ("A") REFERENCES "user_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToStack" ADD CONSTRAINT "_ProjectToStack_B_fkey" FOREIGN KEY ("B") REFERENCES "user_stacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
