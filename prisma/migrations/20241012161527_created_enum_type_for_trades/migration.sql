/*
  Warnings:

  - Changed the type of `realized` on the `Trade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Trade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TradeType" AS ENUM ('CALL', 'PUT');

-- CreateEnum
CREATE TYPE "Realized" AS ENUM ('GAIN', 'LOSS');

-- AlterTable
ALTER TABLE "Trade" DROP COLUMN "realized",
ADD COLUMN     "realized" "Realized" NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "TradeType" NOT NULL;
