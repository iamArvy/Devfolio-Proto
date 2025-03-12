-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "jobId" INTEGER;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
