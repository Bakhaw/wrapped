-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "album" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "wrappedItemId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WrappedItem" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "WrappedItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_wrappedItemId_fkey" FOREIGN KEY ("wrappedItemId") REFERENCES "WrappedItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WrappedItem" ADD CONSTRAINT "WrappedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
