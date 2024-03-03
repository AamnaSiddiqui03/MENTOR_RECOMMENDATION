const mongoose= require('mongoose');
const mysql = require("mysql2/promise");
const { error } = require("console");
// Get the client
let pool;

const connectToSQL= ()=>{
try {
        pool = mysql.createPool({
        user: 'root',
        host: 'localhost',
        password: 'root',
        database: 'mentordbms',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    console.log("Congrats alaka connected mySQL")
} catch (error) {
    console.log("cld'nt connect to sql")
    
}
}





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
connectToSQL();






  module.exports= {connectToMongo , pool};