/*
  Warnings:

  - The primary key for the `Progress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Progress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Progress` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `chapterId`);
