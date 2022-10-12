import nodemailer from 'nodemailer';
import config from '../config';

// Generate test SMTP service account from ethereal.email
// create reusable transporter object using the default SMTP transport
const emailTransporter = nodemailer.createTransport({
  service: 'gmail', // Email Service
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASSWORD,
  },
});

export default emailTransporter;
