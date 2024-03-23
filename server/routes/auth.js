const { pool } = require('../db/db')
const fetchuser = require('../middlewares/fetchuser')


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





//ROUTE 1: CREATING USER
router.post('/signup', async (req, res) => {
    try {
        const { email, name, password, isMentor } = req.body;
        // const isMentor = 0;

        // Hash the password
        const hash = await bcrypt.hash(password, saltRounds);

        // Insert user data into the database
        const connection = await pool.getConnection();
        const [result] = await connection.query('INSERT INTO users (email, name, password, isMentor) VALUES (?, ?, ?, ?)', [email, name, hash, isMentor]);
        connection.release();

        // Send success response
        const data = {
            user: {
                id: email,
                isMentor: isMentor
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        return res.status(200).json({ success: true, message: 'User signed up successfully', authtoken, userid: email });

    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



//ROUTE 2 : LOGIN
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
                                id: email,
                                isMentor: results[0].isMentor
                            }
                        };
                        const authtoken = jwt.sign(data, JWT_SECRET);
                        return res.json({ success: true, authtoken, userid: email });
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



//get all details about the user from user id
//-> we are send the authtoken in headers from the front end and in middleware we are check if the token exist and we are retrieving details from the tokens, ie. the userid (here emailid) then we are selecting the data with that email from dbs.


//FETCHUSER
//ROUTE 3: FetchUser , LOGGEDIN REQUIRED(fetchuser)
router.get('/getUser', fetchuser, async (req, res) => {
    let userid = req.user.id;
    //find user with this email and not select its password
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('SELECT email, name, isMentor FROM users WHERE email = ?', [userid]);
        connection.release();
        if (result.length > 0) {
            res.status(200).send({ success: true, result: result[0] });
        } else {
            res.status(401).send({ success: false, message: "You are Unauthorised" })
        }
    } catch (error) {
        console.error('Error in fetching user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }

})



//ROUTE 4: UPDATE USER DETAILS
router.put('/updateUser', fetchuser, async (req, res) => {
    const userid = req.user.id;
    const { name } = req.body; // i am only change the name

    try {

        const connection = await pool.getConnection();
        const [result] = await connection.query('UPDATE users SET name=? WHERE email=?', [name, userid]);
        connection.release();
        if (result.affectedRows > 0) {
            res.status(200).send({ success: true, message: "User details updated successfully" });
        } else {
            res.status(404).send({ success: false, message: "User not found or no changes were made" });
        }
    } catch (error) {
        console.error('Error in updating user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//ROUTE 5: Delete User Details
router.delete('/deleteUser', fetchuser, async (req, res) => {
    //we are getting the user id
    try {
        const userid = req.user.id;
        const connection = await pool.getConnection();
        //DELETE FROM table_name WHERE condition
        const [result] = await connection.query('DELETE FROM users WHERE email=?', [userid])
        if (result.affectedRows > 0) {
            res.status(200).send({ success: true, message: "User deleted successfully" });
        } else {
            res.status(404).send({ success: false, message: "User not found or no changes were made" });
        }
    } catch (error) {
        console.error("error in deleting user", error);
        res.status(500).send({ message: "Internal server error" })
    }
})


module.exports = router;