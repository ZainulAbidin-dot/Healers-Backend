-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "request_method" TEXT NOT NULL,
    "request_url" TEXT NOT NULL,
    "request_origin" TEXT NOT NULL,
    "error_message" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);
