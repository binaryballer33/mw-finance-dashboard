/*
  Warnings:

  - Added the required column `buyToClose` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contracts` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyTradeId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profitLossPercentage` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellToOpen` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tickerTradeId` to the `Trade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weeklyTradeId` to the `Trade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trade" ADD COLUMN     "buyToClose" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "contracts" INTEGER NOT NULL,
ADD COLUMN     "monthlyTradeId" TEXT NOT NULL,
ADD COLUMN     "profitLossPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sellToOpen" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tickerTradeId" TEXT NOT NULL,
ADD COLUMN     "weeklyTradeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MonthlyTrade" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "tradeCount" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonthlyTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyTrade" (
    "id" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "tradeCount" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "monthlyTradeId" TEXT NOT NULL,

    CONSTRAINT "WeeklyTrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TickerTrade" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "tradeCount" INTEGER NOT NULL,
    "ticker" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TickerTrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyTrade_month_year_key" ON "MonthlyTrade"("month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyTrade_week_year_key" ON "WeeklyTrade"("week", "year");

-- CreateIndex
CREATE UNIQUE INDEX "TickerTrade_ticker_key" ON "TickerTrade"("ticker");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_weeklyTradeId_fkey" FOREIGN KEY ("weeklyTradeId") REFERENCES "WeeklyTrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_monthlyTradeId_fkey" FOREIGN KEY ("monthlyTradeId") REFERENCES "MonthlyTrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_tickerTradeId_fkey" FOREIGN KEY ("tickerTradeId") REFERENCES "TickerTrade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyTrade" ADD CONSTRAINT "WeeklyTrade_monthlyTradeId_fkey" FOREIGN KEY ("monthlyTradeId") REFERENCES "MonthlyTrade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
