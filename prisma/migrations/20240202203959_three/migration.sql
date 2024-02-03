/*
  Warnings:

  - You are about to drop the column `wheather` on the `Weater` table. All the data in the column will be lost.
  - Added the required column `weather` to the `Weater` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Weater" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "weather" TEXT NOT NULL,
    "temp" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "deg" INTEGER NOT NULL
);
INSERT INTO "new_Weater" ("deg", "id", "name", "speed", "temp") SELECT "deg", "id", "name", "speed", "temp" FROM "Weater";
DROP TABLE "Weater";
ALTER TABLE "new_Weater" RENAME TO "Weater";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
