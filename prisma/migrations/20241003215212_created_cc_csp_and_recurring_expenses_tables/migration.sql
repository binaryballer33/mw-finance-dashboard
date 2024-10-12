-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "profitLoss" DOUBLE PRECISION NOT NULL,
    "realized" TEXT NOT NULL,
    "strike" INTEGER NOT NULL,
    "ticker" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecurringExpense" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecurringExpense_pkey" PRIMARY KEY ("id")
);
