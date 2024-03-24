const { pool } = require('../db/db')
const fetchuser = require('../middlewares/fetchuser')
const express = require('express');
const router = express.Router();
const JWT_SECRET = "AamnaAlakaFatimaApekshaDarshana";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');




//ROUTE 6: Fetch all mentor and student details
router.get('/allDetails', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [mentors] = await connection.query('SELECT * FROM users WHERE isMentor = ?', [1]); // Fetch all mentors
        const [students] = await connection.query('SELECT * FROM users WHERE isMentor = ?', [0]); // Fetch all students
        connection.release();
        res.status(200).json({ success: true, mentors, students });
    } catch (error) {
        console.error('Error fetching all details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

//ROUTE 7: Fetch count of mentors and students
router.get('/count', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [mentorCount] = await connection.query('SELECT COUNT(*) AS count FROM users WHERE isMentor = ?', [1]); // Count of mentors
        const [studentCount] = await connection.query('SELECT COUNT(*) AS count FROM users WHERE isMentor = ?', [0]); // Count of students
        connection.release();
        res.status(200).json({ success: true, mentorCount: mentorCount[0].count, studentCount: studentCount[0].count });
    } catch (error) {
        console.error('Error fetching count:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/deleteMyUser/:id', async (req, res) => {
    //we are getting the user id
    try {
        const userid = req.params.id;
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
