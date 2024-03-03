//To check if logged in -> And get user details/id from jwt tokens
//using jwt verification
const jwt= require('jsonwebtoken');
const JWT_SECRET = "AamnaAlakaFatimaApekshaDarshana";

const fetchuser = (req,res,next)=>{

    const token= req.header('auth-token');

    //does token exist, in header ie in localstorage
    if(!token){
        res.json(401).send({error: 'please authenticate using a valid token'})
    }

    try {
        let data= jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        console.log(req.user);
        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }



}


module.exports = fetchuser;