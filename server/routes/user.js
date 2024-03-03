// routes/mentor.js
const express = require('express');
const router = express.Router();
const MentorData = require('../models/MentorData');
const student = require('../models/students')

// Define the fetchMentors function
async function fetchMentors() {
    try {
        const mentors = await MentorData.find({});
        if (mentors.length > 0) {
            return mentors;
        } else {
            console.log('No mentor data');
            return [];
        }
    } catch (error) {
        console.error('Error fetching mentors:', error);
        return [];
    }
}

router.get('/recommender/student', async (req, res) => {
    try {
        // Call fetchMentors to retrieve mentors
        const mentors = await fetchMentors();
        // console.log(mentors);
        res.status(200).json({ mentors });
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/studentdetails', async (req,res)=>{

    try{
        console.log(req.body.userid);
        const user= await student.create({
            userid: req.body.userid,
            name: req.body.name,
            interests: req.body.Interests,
            educationalInstitute: req.body.Institution,
            WorkingOn: req.body.project,
            isMentor: false
        })
        res.status(200).json({ id: user._id });
        // console.log(user._id)

    }catch (error) {
        console.error(error.message)
        res.status(500).send("Some Unexpected error has occurred")
    }
})


router.put('/Updatestudentdetails', async (req,res)=>{

    try{
        const user= await student.findOneAndUpdate(
            {userid: req.body.userid},
            {
                userid: req.body.userid,
                name: req.body.upname,
                interests: req.body.upInterests,
                educationalInstitute: req.body.upInstitution,
                WorkingOn: req.body.upproject,
                isMentor: false
            })
        
        
        res.status(200).json({ id: user._id });
        // console.log(user._id)

    }catch (error) {
        console.error(error.message)
        res.status(500).send("Some Unexpected error has occurred")
    }
})



router.delete('/deleteusernote', async (req,res)=>{

    try{
        const user= await student.findOneAndDelete(
            {userid: req.body.userid})
        
        
        res.status(200).json('deleted');
        // console.log(user._id)

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' })}
    
})
router.get('/fetchusernote', async (req, res) => {
    try {
        const user = await student.findOne({ userid: `${req.headers.userid}` }); // Using findOne instead of find
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Unexpected error has occurred");
    }
});

module.exports = router;
