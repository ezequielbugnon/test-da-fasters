/*
  Warnings:

  - You are about to drop the `Wheater` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Wheater";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Weater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "wheather" TEXT NOT NULL,
    "temp" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "deg" INTEGER NOT NULL
);
