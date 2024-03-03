const express = require('express');
const app = express();
const router= express.Router();
const Student=require('../models/students');
const MentorData=require('../models/MentorData');
const { fetchStudentById, recommendMentors} = require('../utils/recommendfunc');
 
router.get('/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    console.log(studentId);
    try {
        const student = await fetchStudentById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        const recommendations = await recommendMentors(student);
        res.json(recommendations);
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports= router;
