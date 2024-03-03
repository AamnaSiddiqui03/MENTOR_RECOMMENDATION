const mongoose = require('mongoose');
const MentorData = require('./models/MentorData');
const Student = require('./models/students');

const mongoURI = "mongodb+srv://mentor:Darshana123@cluster0.jlltv2a.mongodb.net/MentorRecommender";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

connectToMongo();

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
                expertise: mentor.expertise
            };
        }).sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            } else {
                return b.experience - a.experience;
            }
        });

        // Return the first five recommendations
        return recommendedMentors.slice(0, 5);
    }).catch(error => {
        console.error('Error recommending mentors:', error);
        return null;
    });
}

// Example usage:
const studentId = '65de0f17d778bdf6fa2c1f7e'; // ID of the student requesting recommendations
fetchStudentById(studentId)
    .then(student => {
        if (student) {
            recommendMentors(student)
                .then(recommendations => {
                    if (recommendations) {
                        console.log('Recommendations:', recommendations);
                    } else {
                        console.log('Failed to generate recommendations.');
                    }
                });
        } else {
            console.log('Student not found.');
        }
    })
    .catch(error => {
        console.error('Error fetching student:', error);
    });
