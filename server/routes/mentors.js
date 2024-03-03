
const express = require('express');
const router = express.Router();
const MentorData = require('../models/MentorData');


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

module.exports=router;