-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "file" BYTEA NOT NULL,
    "filename" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);
