/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `roles` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `role_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `roles` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` MODIFY `role_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `roles_id_key` ON `roles`(`id`);
