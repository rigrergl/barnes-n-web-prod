DROP PROCEDURE IF EXISTS SearchListings;

DELIMITER //

CREATE PROCEDURE SearchListings(
	IN bookTitle VARCHAR(255),
	IN isbn_10 VARCHAR(13),
    IN isbn_13 VARCHAR(17),
    IN author VARCHAR(255)
    -- IN locationInfo VARCHAR(30), -- in the format 'POINT(x.xxx x.xxx)'
    -- IN maxDistanceInMeters INT
)
BEGIN
	/*
	SET @userLocation = ST_GeomFromText(locationInfo, 4326);

	DROP TEMPORARY TABLE IF EXISTS locationsInRange;
	CREATE TEMPORARY TABLE locationsInRange AS
		SELECT location_id, ST_Distance_Sphere(position, @userLocation) as distance_m FROM GeoLocation HAVING distance_m <= maxDistanceInMeters;

	*/
	SELECT * FROM Listings l
    WHERE (l.title = bookTitle OR l.isbn_10 = isbn_10 OR l.isbn_13 = isbn_13 OR l.author = author)
	AND l.rented_by IS NULL;
	-- AND l.location_id IN (SELECT location_id FROM locationsInRange);
END //

DELIMITER ;