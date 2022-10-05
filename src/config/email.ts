import nodemailer from 'nodemailer';

// Generate test SMTP service account from ethereal.email
// create reusable transporter object using the default SMTP transport
const emailTransporter = nodemailer.createTransport({
  service: 'gmail', // Email Service
  auth: {
    user: 'semnasptktif@gmail.com',
    pass: 'zmdlziputnhoiren',
  },
});

export default emailTransporter;
