const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router(); // Invoke express.Router() to create a new router instance

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "amsiddiqui03@gmail.com",
        pass: "nejq fckx jynj bfyv", // Use an app-specific password or enable "Less secure app access" for your Gmail account
    },
});

router.post("/send-email", (req, res) => {
    const { email, query } = req.body;

    const mailOptions = {
        from: email,
        to: "amsiddiqui03@gmail.com",
        subject: "Nodemailer Test",
        html: `<h1>${query}</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send("Failed to send email");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
        }
    });
});

module.exports = router;
