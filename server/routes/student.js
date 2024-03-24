// routes/mentor.js
const express = require('express');
const router = express.Router();
// const MentorData = require('../models/MentorData');
const student = require('../models/students');
const fetchuser = require('../middlewares/fetchuser');









//ROUTE 1: Create student details note, LOGGED IN REQUIRED

router.post('/addDetails', fetchuser, async (req, res) => {
    const userid = req.user.id;
    
    try {
        // console.log(req.body.userid);
        const user = await student.create({
            userid: userid,
            name: req.body.name,
            interests: req.body.Interests,
            educationalInstitute: req.body.Institution,
            WorkingOn: req.body.project,
            isMentor: false
        })
        console.log(user);
        res.status(200).send(user);
        // console.log(user._id)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Unexpected error has occurred")
    }
})



//ROUTE 2: Update Student Details Notes, LOGGED IN REQUIRED
router.put('/updateDetails/:id', fetchuser, async (req, res) => {

    try {


        let user = await student.findById(req.params.id);

        if (!user) {
            res.status(404).send({ message: "Notes not found" })
        }
        if (req.user.id !== user.userid) {
            res.json(401).send({ message: "Unauthorised User" })
        }

        user = await student.findByIdAndUpdate(req.params.id,
            {
                name: req.body.upname,
                interests: req.body.upInterests,
                educationalInstitute: req.body.upInstitution,
                WorkingOn: req.body.upproject,
                isMentor: false

            },
            { new: true }
        )
        res.status(200).json(user);


    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Unexpected error has occurred")
    }
})




//ROUTE 3: DELETE student details Notes, LOGGED IN REQUIRED
router.delete('/deleteDetails/:id',fetchuser, async (req, res) => {

    try {
        let user = await student.findById(req.params.id);
        // console.log(user);

        if (!user) {
            res.status(404).send("Not Found");
        }

        if (user.userid !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // console.log(user._id)

        user = await student.findByIdAndDelete(req.params.id);
        res.json({ message: "Success , Note has been deleted successfully!"});

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An unexpected error occurred' })
    }
    
})






//ROUTE 4: FetchAll notes , Logged IN REQUIRED
router.get('/fetchNotes', fetchuser, async (req, res) => {
    try {
        const user = await student.find({ userid: req.user.id }); // Using findOne instead of find
        if (user) {
            res.status(200).send( user );
            // console.log(user)
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Unexpected error has occurred");
    }
});

//ROUTE 5 
router.delete('/deleteAllStudents',fetchuser,async(req,res) =>{
    try{
        const user= await student.deleteMany({userid: req.user.id});
        if(user){
            res.status(200).send(user);

        } else{
            res.status(404).json({ error: 'user not found' });
        }
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some Unexpected error has occurred");
    }

});

module.exports = router;
