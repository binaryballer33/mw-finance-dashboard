/*
  Warnings:

  - The values [CALL,PUT] on the enum `TradeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TradeType_new" AS ENUM ('BUY_CALL', 'BUY_PUT', 'SELL_CALL', 'SELL_PUT');
ALTER TABLE "Trade" ALTER COLUMN "type" TYPE "TradeType_new" USING ("type"::text::"TradeType_new");
ALTER TYPE "TradeType" RENAME TO "TradeType_old";
ALTER TYPE "TradeType_new" RENAME TO "TradeType";
DROP TYPE "TradeType_old";
COMMIT;
