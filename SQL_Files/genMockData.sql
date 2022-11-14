
/* Generate Listings */

/*First Listing*/
INSERT INTO GeoLocation (position)
VALUES (ST_GeomFromText('POINT(6.906124 79.96952)', 4326));

INSERT INTO Listings  (owner_id, title)
VALUES (1, 'Random Book 1');

/*Second Listing*/
INSERT INTO GeoLocation (position)
VALUES (ST_GeomFromText('POINT(7.906124 89.96952)', 4326));

INSERT INTO Listings  (owner_id, title)
VALUES (1, 'Random Book 2');

/*Third Listing*/
INSERT INTO GeoLocation (position)
VALUES (ST_GeomFromText('POINT(80.906124 79.96952)', 4326));

INSERT INTO Listings  (owner_id, title)
VALUES (1, 'Random Book 1');

