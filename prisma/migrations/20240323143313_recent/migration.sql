/*
  Warnings:

  - You are about to drop the column `wrappedItemId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the `WrappedItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_wrappedItemId_fkey";

-- DropForeignKey
ALTER TABLE "WrappedItem" DROP CONSTRAINT "WrappedItem_userId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "wrappedItemId",
ADD COLUMN     "wrapId" TEXT;

-- DropTable
DROP TABLE "WrappedItem";

-- CreateTable
CREATE TABLE "Wrap" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "ownerEmail" TEXT,

    CONSTRAINT "Wrap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_wrapId_fkey" FOREIGN KEY ("wrapId") REFERENCES "Wrap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wrap" ADD CONSTRAINT "Wrap_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
