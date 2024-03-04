const express= require('express');
const app= express();
const cors = require('cors')

const port = 8080;
app.use(cors());
app.use(express.json());
//import the dbs
const {connectToMongo} = require('./db/db');


//Connections
connectToMongo();


app.get('/', (req, resp)=>{
    resp.send('Hello Someone!')
});
//import the routes

app.use("/api/auth" , require("./routes/auth"));
app.use("/api/gmail" , require("./routes/gmail"));
app.use("/api/mentors" , require("./routes/mentors"));
app.use("/api/student" , require("./routes/student"));
app.use("/api/recommend" , require("./routes/recommend"))
// app.use("/api/auth" , require("./routes/auth");
// app.get("/")




app.listen(port, ()=>{
    console.log(`listening at port http://localhost:${port}`)
})