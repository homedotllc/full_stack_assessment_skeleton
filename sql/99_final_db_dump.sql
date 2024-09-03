-- Final Database Normalization Script

USE home_db;

-- Step 1: Create the 'user' table
CREATE TABLE `user` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Step 2: Create the 'home' table
CREATE TABLE `home` (
    `home_id` INT AUTO_INCREMENT PRIMARY KEY,
    `street_address` VARCHAR(255) NOT NULL,
    `state` VARCHAR(50) NOT NULL,
    `zip` VARCHAR(10) NOT NULL,
    `sqft` FLOAT NOT NULL,
    `beds` INT NOT NULL,
    `baths` INT NOT NULL,
    `list_price` FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Step 3: Create the 'user_home_links' table to establish the many-to-many relationship
CREATE TABLE `user_home_links` (
    `user_id` INT NOT NULL,
    `home_id` INT NOT NULL,
    PRIMARY KEY (`user_id`, `home_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
    FOREIGN KEY (`home_id`) REFERENCES `home`(`home_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Step 4: Populate the 'user' table with unique users from the initial data
INSERT INTO `user` (`username`, `email`)
SELECT DISTINCT `username`, `email`
FROM `user_home`;

-- Step 5: Populate the 'home' table with unique homes from the initial data
INSERT INTO `home` (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
FROM `user_home`;

-- Step 6: Populate the 'user_home_links' table with the relationships
INSERT INTO `user_home_links` (`user_id`, `home_id`)
SELECT u.`user_id`, h.`home_id`
FROM `user_home` uh
JOIN `user` u ON uh.`username` = u.`username`
JOIN `home` h ON uh.`street_address` = h.`street_address`;

-- Step 7: Drop the original 'user_home' table as it's no longer needed
DROP TABLE `user_home`;

