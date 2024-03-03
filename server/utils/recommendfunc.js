const express = require('express');
const app = express();
const router= express.Router();
const Student=require('../models/students');
const MentorData=require('../models/MentorData');

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

async function fetchStudentById(studentId) {
    try {
        const student = await Student.findById(studentId);
        if (student) {
            return student;
        } else {
            console.log(`Student with ID ${studentId} not found.`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        return null;
    }
}

function recommendMentors(student) {
    return fetchMentors().then(mentors => {
        if (!student) {
            console.error('Student not found.');
            return null;
        }

        const recommendedMentors = mentors.map(mentor => {
            const matchScore = mentor.expertise.reduce((score, skill) => {
                if (student.interests.includes(skill)) {
                    return score + 1;
                }
                return score;
            }, 0);
            
            return {
                mentorId: mentor._id,
                matchScore: matchScore,
                experience: mentor.experience,
                name: mentor.name,
                expertise: mentor.expertise,
                photo:mentor.photo
            };
        }).sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            } else {
                return b.experience - a.experience;
            }
        });

        // Return the first five recommendations
        return recommendedMentors.slice(0, 6);
    }).catch(error => {
        console.error('Error recommending mentors:', error);
        return null;
    });
}


module.exports= {fetchMentors, fetchStudentById, recommendMentors};


