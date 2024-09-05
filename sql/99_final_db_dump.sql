-- Create the user table with an auto-incrementing primary key
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create the home table with an auto-incrementing primary key
CREATE TABLE home (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street_address VARCHAR(255) UNIQUE NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    sqft DECIMAL(10, 2) NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    list_price DECIMAL(15, 2) NOT NULL
);

-- Create the user_home relationship table
CREATE TABLE home_user (
    user_id INT,
    home_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (home_id) REFERENCES home(id),
    PRIMARY KEY (user_id, home_id)
);

-- Insert unique users into the user table
INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM home_db.user_home;

-- Insert unique homes into the home table
INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM home_db.user_home;

-- Insert relationships into the user_home table
INSERT INTO home_user (user_id, home_id)
SELECT u.id, h.id
FROM home_db.user_home uh
JOIN user u ON uh.username = u.username
JOIN home h ON uh.street_address = h.street_address; 