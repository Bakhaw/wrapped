/*
  Warnings:

  - The primary key for the `WrappedItem` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_wrappedItemId_fkey";

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "wrappedItemId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WrappedItem" DROP CONSTRAINT "WrappedItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WrappedItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WrappedItem_id_seq";

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_wrappedItemId_fkey" FOREIGN KEY ("wrappedItemId") REFERENCES "WrappedItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
