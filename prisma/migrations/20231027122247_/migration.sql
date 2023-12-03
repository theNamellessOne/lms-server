/*
  Warnings:

  - You are about to drop the column `courseId` on the `Progress` table. All the data in the column will be lost.
  - The primary key for the `Purchase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `chapterId` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_courseId_fkey`;

-- AlterTable
ALTER TABLE `Progress` DROP COLUMN `courseId`,
    ADD COLUMN `chapterId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Purchase` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`courseId`, `userId`);

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `Chapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
