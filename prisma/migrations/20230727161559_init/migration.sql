-- CreateTable
CREATE TABLE "Greeting" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Greeting_pkey" PRIMARY KEY ("id")
);
