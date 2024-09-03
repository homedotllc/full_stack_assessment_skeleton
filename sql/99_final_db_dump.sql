USE home_db;
CREATE TABLE user (
    id INT(11) AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE home (
    id INT(11) AUTO_INCREMENT,
    street_address VARCHAR(255) NOT NULL UNIQUE,
    state VARCHAR(50),
    zip VARCHAR(10) NOT NULL,
    sqft FLOAT,
    beds INT,
    baths INT,
    list_price FLOAT,
    PRIMARY KEY (id)
);

CREATE TABLE user_home_map (
    id INT(11) AUTO_INCREMENT,
    user_id INT(11) NOT NULL,
    home_id INT(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (home_id) REFERENCES home(id)
);

INSERT INTO user (username, email)
SELECT DISTINCT username, email
FROM user_home;

INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price
FROM user_home;

INSERT INTO user_home_map (user_id, home_id)
SELECT u.id, h.id
FROM user_home uh
JOIN user u ON uh.username = u.username
JOIN home h ON uh.street_address = h.street_address;

DROP TABLE user_home;
