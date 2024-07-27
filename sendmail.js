const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Middleware to enable cors
app.use(cors());

// Serve the frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Define a route to handle form submission
app.post('/submit-booking', (req, res) => {
    // Retrieve form data from request body
    const {names, email, checkin, checkout, adult, children, room, message } = req.body;
    // console.log(req.body)


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'makabai362@gmail.com', // Your Gmail email address
        pass: 'sxhh sqpv szar ukzb' // Your Gmail password
    }
});

    // Email content
    const mailOptions = {
        from: 'makabai362@gmail.com', // Sender address
        to: 'kylemacklane@gmail.com', // Receiver address
        subject: 'New Room Booking', // Subject line
        text: `Room Booking Details:
        names: ${names}
        email: ${email}
        Check-in: ${checkin}
        Check-out: ${checkout}
        Adults: ${adult}
        Child: ${children}
        Room: ${room}
        Special-Request: ${message}       
        
        `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Booking submitted successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
