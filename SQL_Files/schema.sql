CREATE TABLE IF NOT EXISTS User (
    username VARCHAR(255),
    password TEXT,
    fullName VARCHAR(255),
    phoneNumber INT,
    email VARCHAR(255),
    addressKey VARCHAR(55),
    bookKey(55),

    PRIMARY KEY (email)
);

CREATE TABLE IF NOT EXISTS Address (
    Id INT,
    streetAddress VARCHAR(255),
    streetAddress2 VARCHAR(255),
    city VARCHAR(55),
    state VARCHAR(55),
    zipCode VARCHAR(55),

    PRIMARY KEY (addressKey)
);

CREATE TABLE IF NOT EXISTS Book (
    Id INT,
    emailOwner VARCHAR(255),
    renter VARCHAR(255),
    title VARCHAR(255),
    author VARCHAR(255),
    isbn13 VARCHAR(17),
    isbn10 VARCHAR(13),
    rentStatus BOOLEAN,

    PRIMARY KEY (Id)
);
