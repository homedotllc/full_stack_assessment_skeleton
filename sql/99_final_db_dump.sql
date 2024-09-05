USE home_db;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `home` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `street_address` VARCHAR(255) NOT NULL UNIQUE,
  `state` VARCHAR(50) DEFAULT NULL,
  `zip` VARCHAR(10) DEFAULT NULL,
  `sqft` FLOAT DEFAULT NULL,
  `beds` INT DEFAULT NULL,
  `baths` INT DEFAULT NULL,
  `list_price` FLOAT DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT IGNORE INTO `user` (`username`, `email`)
SELECT DISTINCT `username`, `email`
FROM `user_home`;

INSERT IGNORE INTO `home` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
FROM `user_home`;

SET SQL_SAFE_UPDATES = 0;

UPDATE `user_home` uh
JOIN `user` u ON uh.username = u.username AND uh.email = u.email
SET uh.user_id = u.id;

UPDATE `user_home` uh
JOIN `home` h ON uh.street_address = h.street_address AND uh.state = h.state
SET uh.home_id = h.id;

SET SQL_SAFE_UPDATES = 1;

ALTER TABLE `user_home`
DROP COLUMN `username`,
DROP COLUMN `email`,
DROP COLUMN `street_address`,
DROP COLUMN `state`,
DROP COLUMN `zip`,
DROP COLUMN `sqft`,
DROP COLUMN `beds`,
DROP COLUMN `baths`,
DROP COLUMN `list_price`;

ALTER TABLE `user_home`
ADD CONSTRAINT fk_user FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
ADD CONSTRAINT fk_home FOREIGN KEY (`home_id`) REFERENCES `home`(`id`);
