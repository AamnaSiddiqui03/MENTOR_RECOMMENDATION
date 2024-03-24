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

INSERT INTO users (email, name, password, isMentor)
VALUES
('matthew.wilson@example.com', 'Mr. Matthew Wilson', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('ananya.singh@example.com', 'Dr. Ananya Singh', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('arjun.sharma@example.com', 'Mr. Arjun Sharma', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('aarti.gupta@example.com', 'Dr. Aarti Gupta', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('rajesh.gupta@example.com', 'Dr. Rajesh Gupta', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('meera.desai@example.com', 'Dr. Meera Desai', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('kavita.das@example.com', 'Dr. Kavita Das', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('swati.mishra@example.com', 'Ms. Swati Mishra', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('pooja.mishra@example.com', 'Ms. Pooja Mishra', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('nehagupta@example.com', 'Dr. Neha Gupta', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('nisha.gupta@example.com', 'Ms. Nisha Gupta', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('ritu.sharma@example.com', 'Ms. Ritu Sharma', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('aarti.desai@example.com', 'Dr. Aarti Desai', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('vikas.verma@example.com', 'Mr. Vikas Verma', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('priya.patel@example.com', 'Dr. Priya Patel', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('rajesh.kumar@example.com', 'Mr. Rajesh Kumar', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('anand.patel@example.com', 'Mr. Anand Patel', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('divya.sharma@example.com', 'Ms. Divya Sharma', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('emily.wilson@example.com', 'Ms. Emily Wilson', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('pooja.patel@example.com', 'Ms. Pooja Patel', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('sanjay.verma@example.com', 'Mr. Sanjay Verma', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('sneha.sharma@example.com', 'Ms. Sneha Sharma', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1),
('pooja.gupta@example.com', 'Ms. Pooja Gupta', '$2b$10$0Rbh3a54.beTSJUg3Rw3POQT96Qj9rQK2ePYau1efWyIisdJhAl5G', 1);
