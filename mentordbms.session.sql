SELECT * FROM users;
 -- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS mentordbms;

-- Switch to the newly created database
USE mentordbms;

-- Create the users table
CREATE TABLE users (
    email VARCHAR(50) PRIMARY KEY,
    name VARCHAR(45),
    password VARCHAR(500),
    isMentor TINYINT
);