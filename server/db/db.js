const mongoose= require('mongoose');
const mysql = require("mysql2/promise");
const { error } = require("console");
// Get the client


const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'root',
    database: 'mentordbms',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});





//Using MongoDB
const MongoURL='mongodb+srv://mentor:Darshana123@cluster0.jlltv2a.mongodb.net/MentorRecommender'


const connectToMongo=async ()=>{

    try{
        await mongoose.connect(MongoURL);
        console.log('congrats aamna mongodb connected');
    }catch(e){
        console.error(e);
    }
}





  module.exports= {connectToMongo , pool};