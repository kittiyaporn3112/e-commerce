/*
  Warnings:

  - Made the column `writer` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `amount` INTEGER NULL,
    ADD COLUMN `currentcy` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `stripePaymentId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `writer` VARCHAR(191) NOT NULL;
