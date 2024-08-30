USE home_db;

SET PERSIST local_infile = 1;

CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `home` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `street_address` VARCHAR(255) NOT NULL UNIQUE,
  `state` VARCHAR(50) DEFAULT NULL,
  `zip` VARCHAR(10) DEFAULT NULL,
  `sqft` FLOAT DEFAULT NULL,
  `beds` INT DEFAULT NULL,
  `baths` INT DEFAULT NULL,
  `list_price` FLOAT DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `user_home_relation` (
  `user_id` INT NOT NULL,
  `home_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON DELETE CASCADE,
  PRIMARY KEY (`user_id`, `home_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `user` (`username`, `email`)
SELECT DISTINCT `username`, `email`
FROM `user_home`;

INSERT INTO `home` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
FROM `user_home`;

INSERT INTO `user_home_relation` (`user_id`, `home_id`)
SELECT u.id, h.id
FROM `user_home` uh
JOIN `user` u ON uh.username = u.username
JOIN `home` h ON uh.street_address = h.street_address;

DROP TABLE IF EXISTS `user_home`;
