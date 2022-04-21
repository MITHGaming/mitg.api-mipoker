-- DropIndex
DROP INDEX `users_username_key` ON `users`;

-- AlterTable
ALTER TABLE `users` MODIFY `username` VARCHAR(191) NULL;
