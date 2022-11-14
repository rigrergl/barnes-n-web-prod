DROP PROCEDURE IF EXISTS CreateListing;

DELIMITER //

CREATE PROCEDURE CreateListing(
	IN ownerID INT,
    IN title VARCHAR(255),
    -- IN locationInfo VARCHAR(30), -- in the format 'POINT(x.xxx x.xxx)'
    IN isbn10 VARCHAR(13),
    IN isbn13 VARCHAR(17),
    IN image BLOB,
    IN author VARCHAR(255),
    IN maxDueDate DATE
)
BEGIN       
	/*
    INSERT INTO GeoLocation(position)
    VALUES (ST_GeomFromText(locationInfo, 4326));
    
    SET @geoLocationId = (SELECT LAST_INSERT_ID());
    */
    
    INSERT INTO Listings  (owner_id, title, isbn_10, isbn_13, image, author, max_due_date)
    VALUES (ownerId, title, isbn10, isbn13, image, author, maxDueDate);
    
    SELECT LAST_INSERT_ID() AS listing_id;
END //

DELIMITER ;