/*
  Warnings:

  - You are about to drop the `RecurringExpense` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RecurringExpense";

-- CreateTable
CREATE TABLE "MonthlyExpense" (
    "id" TEXT NOT NULL,
    "dueDayOfMonth" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthlyExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearlyExpense" (
    "id" TEXT NOT NULL,
    "monthDayDue" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "YearlyExpense_pkey" PRIMARY KEY ("id")
);
