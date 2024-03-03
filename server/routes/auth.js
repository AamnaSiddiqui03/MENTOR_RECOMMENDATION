//we have to create end points here

const {pool} = require('../db/db')

//connect database sql
// const mysql = require('mysql2/promise');
// const pool = mysql.createPool({
//     user: 'root',
//     host: 'localhost',
//     password: 'root',
//     database: 'mentordbms',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });


//main express function
const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
const router = express.Router();
// const jwt =require('jsonwebtoken');

const JWT_SECRET = "AamnaAlakaFatimaApekshaDarshana";
//importing models
// const user= require('./models/user');

//to hash the passord- we need bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//for token authorization we need jwt and it's secret

const jwt = require('jsonwebtoken');

//check content validation
// const { body, validationResult } = require('express-validator');

// start creating endpoints

//1. Create User :
router.post('/signup/student', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const isMentor = 0;

        // Hash the password
        const hash = await bcrypt.hash(password, saltRounds);

        // Insert user data into the database
        const connection = await pool.getConnection();
        const [result] = await connection.query('INSERT INTO users (email, name, password, isMentor) VALUES (?, ?, ?, ?)', [email, name, hash, isMentor]);
        connection.release();

        // Send success response
        const data = {
            user: {
                email: email
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({ success: true, message: 'User signed up successfully', authtoken, userid: email });
    
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
//2. Create mentor
// app.get('/getuser', usermentor, async (req, res) => {
//     //condtions:
//     try {

//         email = req.user.email;
//         const connection = await pool.getConnection();
//         const [result] = await connection.query('SELECT * FROM users WHERE email=?', email);
//         connection.release();
//         res.status(200).json({ message: 'User signed up successfully' });
//     } catch (e) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");

//     }



//     //1. check for validation errors
//     //2.check for same user if exists
//     //3. compare the passwords, check if exists
//     //4. check the jwt



// })


router.post('/login/student', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Check if the username and password match entries in the database
        const [results] = await connection.query('SELECT * FROM users WHERE email = ?', [email]); // Add email as parameter

        // Release the connection back to the pool
        connection.release();

        if (results.length > 0) {
            // If the username exists, compare the password
            bcrypt.compare(password, results[0].password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ success: false, message: 'Error logging in user' });
                } else {
                    if (result) {
                        const data = {
                            user: {
                                email: email // Use the provided email
                            }
                        };
                        const authtoken = jwt.sign(data, JWT_SECRET);
                        return res.json({ success: true, authtoken , userid: email});
                    } else {
                        // Passwords don't match
                        return res.status(401).json({ success: false, message: 'Invalid credentials' });
                    }
                }
            });
        } else {
            // Username not found in the database
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



module.exports = router;