/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_link_key" ON "Note"("link");
