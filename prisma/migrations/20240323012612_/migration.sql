/*
  Warnings:

  - The `wrappedItemId` column on the `Album` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `WrappedItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `WrappedItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_wrappedItemId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "wrappedItemId",
ADD COLUMN     "wrappedItemId" INTEGER;

-- AlterTable
ALTER TABLE "WrappedItem" DROP CONSTRAINT "WrappedItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "WrappedItem_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_wrappedItemId_fkey" FOREIGN KEY ("wrappedItemId") REFERENCES "WrappedItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
