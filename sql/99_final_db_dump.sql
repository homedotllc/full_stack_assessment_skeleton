use home_db;
CREATE TABLE user as select distinct username, email from user_home;
CREATE TABLE home as select distinct street_address, state, zip, sqft,beds,baths,list_price from user_home;

ALTER TABLE home ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;
ALTER TABLE user ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

ALTER TABLE user ADD UNIQUE KEY (username);
ALTER TABLE home ADD UNIQUE KEY (street_address);

ALTER TABLE user MODIFY COLUMN username varchar(100) NOT NULL;
ALTER TABLE home MODIFY COLUMN street_address varchar(255) NOT NULL;

CREATE TABLE user_home_mapping (
    user_id INT,
    home_id INT,
    PRIMARY KEY (user_id, home_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (home_id) REFERENCES home(id)
);


INSERT INTO user_home_mapping (user_id, home_id) 
	select u.id, h.id from user_home uh
	JOIN user u on uh.username= u.username and uh.email = u.email
    JOIN home h on uh.street_address= h.street_address;
