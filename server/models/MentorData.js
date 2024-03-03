// MentorData.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  isMentor: Boolean,
  mentor_id: Number,
  name: String,
  photo: String,
  gender: String,
  email: String,
  expertise: [String],
  working_place: String,
  bio: String,
  experience: Number,
  projects: [String],
  qualifications: String
});

const MentorData = mongoose.model('MentorData', mentorSchema);

module.exports = MentorData;
