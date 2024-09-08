-- CreateTable
CREATE TABLE `home` (
    `street_address` VARCHAR(255) NOT NULL,
    `state` VARCHAR(50) NULL,
    `zip` VARCHAR(10) NULL,
    `sqft` FLOAT NULL,
    `beds` INTEGER NULL,
    `baths` INTEGER NULL,
    `list_price` FLOAT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `street_address`(`street_address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_home` (
    `username` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `street_address` VARCHAR(255) NULL,
    `state` VARCHAR(50) NULL,
    `zip` VARCHAR(10) NULL,
    `sqft` FLOAT NULL,
    `beds` INTEGER NULL,
    `baths` INTEGER NULL,
    `list_price` FLOAT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_home_mapping` (
    `user_id` INTEGER NOT NULL,
    `home_id` INTEGER NOT NULL,

    INDEX `home_id`(`home_id`),
    PRIMARY KEY (`user_id`, `home_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_home_mapping` ADD CONSTRAINT `user_home_mapping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_home_mapping` ADD CONSTRAINT `user_home_mapping_ibfk_2` FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

