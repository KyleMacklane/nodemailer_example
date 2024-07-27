const nodemailer = require('nodemailer');

export default async (req, res) => {
    if (req.method === 'POST') {
        const { names, email, checkin, checkout, adult, children, room, message } = req.body;

        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
           service:'gmail',
            auth: {
                user: 'makabai362@gmail.com', // Replace with your email
                pass: 'sxhh sqpv szar ukzb', // Replace with your email password
            },
        });

        // Send mail with defined transport object
        try {
            let info = await transporter.sendMail({
                from: '"Hotel Booking" <makabai362@gmail.com>', // sender address
                to: 'client-email@example.com', // list of receivers
                subject: 'New Booking Request', // Subject line
                text: `You have a new booking request: 
                Names: ${names}
                Email: ${email}
                Check-in: ${checkin}
                Check-out: ${checkout}
                Adults: ${adult}
                Children: ${children}
                Room: ${room}
                Message: ${message}`, // plain text body
            });

            console.log('Message sent: %s', info.messageId);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
