const mongoose = require('mongoose');
const express = require('express');
const app= express();
const port=8080;

app.listen(port, ()=>{
  console.log('listening..');
})
run();



// Function to get a student by ID
async function getStudentById(studentId) {
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      console.error(`Student with ID ${studentId} not found.`);
      return null;
    }
    return student;
  } catch (error) {
    console.error('Error finding student:', error);
    return null;
  }
}

// Function to get all mentors
async function getMentors() {
  try {
    const mentors = await Mentor.find({});
    return mentors;
  } catch (error) {
    console.error('Error finding mentors:', error);
    return [];
  }
}

// Function to get all students
async function getStudents() {
  try {
    const students = await Student.find({});
    return students;
  } catch (error) {
    console.error('Error finding students:', error);
    return [];
  }
}

// Function to recommend mentors for a student
async function recommendMentors(studentId) {
  try {
    // Fetch student data
    const student = await getStudentById(studentId);
    if (!student) {
      return;
    }

    // Fetch all mentors data
    const mentors = await getMentors();

    // Iterate through mentors and calculate match score based on interests and experience
    const recommendedMentors = mentors.map(({ _id: mentorId, expertise, experience, name }) => {
      const matchScore = expertise.reduce((score, skill) => {
        if (student.interests.includes(skill)) {
          return score + 1; // Increase score for each matching interest
        }
        return score;
      }, 0);

      return {
        id: mentorId, // Use a more descriptive field name (e.g., "id" or "studentId")
        matchScore,
        experience,
        name,
        expertise,
      };
    }).sort((a, b) => {
      // Sort by match score first, then by experience (descending order)
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore; // Descending order by match score
      } else {
        return b.experience - a.experience; // Descending order by experience
      }
    });

    // Store the top recommendations in variables
    const firstRecommendation = recommendedMentors[0];
    const nextFourRecommendations = recommendedMentors.slice(1, 5);

    return {
      firstRecommendation,
      nextFourRecommendations,
    };
  } catch (error) {
    console.error('Error recommending mentors:', error);
    return null;
  }
}

// Function to run the application
async function run() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://mentor:Darshana123@cluster0.jlltv2a.mongodb.net/MentorRecommender', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Call the functions based on your use case
    // Example: Get recommendations for a student
    const studentId = '65ddbe8f7215d05ed1158c5b'; // Replace with the actual ID
    const { firstRecommendation, nextFourRecommendations } = await recommendMentors(studentId);
    console.log('First Recommendation:', firstRecommendation);
    console.log('Next Four Recommendations:', nextFourRecommendations);

    // Example: Get all students (use with caution for large datasets)
    // const students = await getStudents();
    // console.log('All Students:', students);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection to MongoDB (replace with mongoose.disconnect() if needed)
    mongoose.connection.close();
    console.log('Connection closed');
  }
}

// Call the run function to start the application
run();
