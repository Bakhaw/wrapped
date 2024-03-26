/*
  Warnings:

  - You are about to drop the column `ownerEmail` on the `Wrap` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wrap" DROP CONSTRAINT "Wrap_ownerEmail_fkey";

-- AlterTable
ALTER TABLE "Wrap" DROP COLUMN "ownerEmail",
ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "Wrap" ADD CONSTRAINT "Wrap_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
