-- CreateTable
CREATE TABLE "Wish" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);
