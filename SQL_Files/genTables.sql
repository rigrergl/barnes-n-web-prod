CREATE DATABASE IF NOT EXISTS DEV_DB;
USE DEV_DB;

DROP TABLE IF EXISTS Listings;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS GeoLocation;

CREATE TABLE Users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    optaddress VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipcode VARCHAR(255) NOT NULL
);

CREATE TABLE GeoLocation (
	location_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    position POINT NOT NULL SRID 4326,
    SPATIAL INDEX(position)
);

CREATE TABLE Listings (
	listing_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    -- location_id INT NOT NULL,
    isbn_10 VARCHAR(13), 
    isbn_13 VARCHAR(17),
    image BLOB, 
    author VARCHAR(255),
    max_due_date DATE,
    rented_by INT, 
    -- FOREIGN KEY (location_id) REFERENCES GeoLocation(location_id),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id),
    FOREIGN KEY (rented_by) REFERENCES Users(user_id)
);

