/*
  Warnings:

  - You are about to drop the column `courseId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_courseId_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `courseId`;

-- AlterTable
ALTER TABLE `Course` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
