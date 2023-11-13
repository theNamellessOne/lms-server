-- CreateIndex
CREATE INDEX `Progress_userId_idx` ON `Progress`(`userId`);

-- CreateIndex
CREATE INDEX `Purchase_courseId_idx` ON `Purchase`(`courseId`);

-- RenameIndex
ALTER TABLE `Attachment` RENAME INDEX `Attachment_courseId_fkey` TO `Attachment_courseId_idx`;

-- RenameIndex
ALTER TABLE `Chapter` RENAME INDEX `Chapter_courseId_fkey` TO `Chapter_courseId_idx`;

-- RenameIndex
ALTER TABLE `Course` RENAME INDEX `Course_authorId_fkey` TO `Course_authorId_idx`;

-- RenameIndex
ALTER TABLE `Course` RENAME INDEX `Course_categoryId_fkey` TO `Course_categoryId_idx`;

-- RenameIndex
ALTER TABLE `Progress` RENAME INDEX `Progress_chapterId_fkey` TO `Progress_chapterId_idx`;

-- RenameIndex
ALTER TABLE `Purchase` RENAME INDEX `Purchase_userId_fkey` TO `Purchase_userId_idx`;
