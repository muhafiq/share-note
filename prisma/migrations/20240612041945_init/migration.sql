-- CreateTable
CREATE TABLE "Note" (
    "noteId" TEXT NOT NULL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
