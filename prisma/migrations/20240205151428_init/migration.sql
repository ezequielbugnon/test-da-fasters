-- CreateTable
CREATE TABLE "Weather" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "temp" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "deg" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Weather_pkey" PRIMARY KEY ("id")
);
