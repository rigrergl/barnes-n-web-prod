DROP PROCEDURE IF EXISTS EditProfile;

DELIMITER //

CREATE PROCEDURE EditProfile(
	IN userId INT,
    IN phone VARCHAR(255),
    IN email VARCHAR(255),
    IN street VARCHAR(255), 
    IN optaddress VARCHAR(255),
    IN city VARCHAR(255),  
    IN state VARCHAR(255),
    IN zipcode VARCHAR(255)
)
BEGIN

	UPDATE Users
    SET phone=phone, email=email, street=street, optaddress=optaddress, city=city, state=state, zipcode=zipcode
    WHERE user_id=userId;

END //

DELIMITER ;