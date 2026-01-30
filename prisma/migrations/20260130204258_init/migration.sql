/*
  Warnings:

  - You are about to drop the column `addressId` on the `customers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_addressId_fkey";

-- DropIndex
DROP INDEX "customers_addressId_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "addressId";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_customerId_key" ON "addresses"("customerId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
