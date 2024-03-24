
const express = require('express');
const router = express.Router();
const MentorData = require('../models/MentorData');
const fetchuser= require('../middlewares/fetchuser')


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

router.get('/fetchAllMentors', async (req, res) => {
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

///////

router.post('/addMentor', fetchuser, async (req, res) => {
    
    try {
        console.log(req.body);
        const mentor = await MentorData.create({
            isMentor: true,
            name: req.body.name,
            photo: req.body.photo,
            gender: req.body.gender,
            email: req.user.id,
            expertise: req.body.expertise,
            working_place: req.body.working_place,
            bio: req.body.bio,
            experience: req.body.experience,
            projects: req.body.projects,
            qualifications: req.body.qualifications
        });
        console.log(mentor)
        res.status(200).json(mentor);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Unexpected error has occurred");
    }
});


router.delete('/deleteMentor', fetchuser, async (req, res) => {
    try {
        
        const mentor = await MentorData.findOne({ email: req.user.id});
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }
        // if (mentor.email !== req.user.email) {
        //     return res.status(401).json({ error: "Unauthorized user" });
        // }
        await MentorData.deleteOne({ email: req.user.id });

        res.json({ message: "Mentor profile deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Unexpected error has occurred");
    }
});

router.get('/fetchMentor', fetchuser, async (req, res) => {
    try {
        const mentor = await MentorData.find({ email: req.user.id });
        if (mentor) {
            res.status(200).send(mentor);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Unexpected error has occurred");
    }
});

module.exports=router;