const express= require('express');
const app= express();
const cors = require('cors')
const { Server } = require("socket.io");

const io = new Server(8001, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});


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