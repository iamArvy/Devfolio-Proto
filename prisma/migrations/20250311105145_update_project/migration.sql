/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role,userId]` on the table `jobs` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `socials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_name_userId_key" ON "contacts"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_role_userId_key" ON "jobs"("role", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_userId_key" ON "projects"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "socials_name_userId_key" ON "socials"("name", "userId");
