/*
  Warnings:

  - You are about to drop the `MonthlyExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YearlyExpense` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "RecurringType" AS ENUM ('INCOME', 'EXPENSE');

-- DropTable
DROP TABLE "MonthlyExpense";

-- DropTable
DROP TABLE "YearlyExpense";

-- CreateTable
CREATE TABLE "MonthlyRecurring" (
    "id" TEXT NOT NULL,
    "dueDayOfMonth" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "RecurringType" NOT NULL,

    CONSTRAINT "MonthlyRecurring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YearlyRecurring" (
    "id" TEXT NOT NULL,
    "monthDayDue" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "RecurringType" NOT NULL,

    CONSTRAINT "YearlyRecurring_pkey" PRIMARY KEY ("id")
);
