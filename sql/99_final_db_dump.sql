-- Start logging
SELECT 'Starting the database migration...' AS 'LOG';

-- Switch to the desired database
USE home_db;

-- Drop the old tables if they exist (Mostly handy in development)
DROP TABLE IF EXISTS home;
DROP TABLE IF EXISTS user;

-- Create the user table
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL
);

-- Create the home table
CREATE TABLE home (
    home_id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft DECIMAL(10, 2) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price DECIMAL(15, 2) NOT NULL
);

-- Insert unique users into the user table
INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM user_home;

-- Insert unique homes into the home table
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM user_home;

-- Alter the user_home table to become a junction table and save ourself from creating new one
ALTER TABLE user_home
ADD COLUMN user_id INT,
ADD COLUMN home_id INT;

-- Update the user_home table with correct user_id and home_id
UPDATE user_home uh
JOIN user u ON uh.username = u.username
JOIN home h ON uh.street_address = h.street_address
SET uh.user_id = u.user_id, uh.home_id = h.home_id;

-- Remove unnecessary columns from user_home
ALTER TABLE user_home
DROP COLUMN username,
DROP COLUMN email,
DROP COLUMN street_address,
DROP COLUMN state,
DROP COLUMN zip,
DROP COLUMN sqft,
DROP COLUMN beds,
DROP COLUMN baths,
DROP COLUMN list_price;

-- Add primary key and foreign keys
ALTER TABLE user_home
ADD PRIMARY KEY (user_id, home_id),
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(user_id),
ADD CONSTRAINT fk_home FOREIGN KEY (home_id) REFERENCES home(home_id);

-- End logging
SELECT 'Ending the database migration...' AS 'LOG';
