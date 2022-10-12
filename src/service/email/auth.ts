import { FRONTEND_URL } from '../../config/index';
import emailTransporter from '../../config/email';

const fromAdmin = `info@dbmaid.com`;

export const serviceSendEmailRegister = (user: {
  username: string;
  email: string;
  userId: string | any;
  tokenVerify: string;
}) =>
  new Promise(async (resolve, reject) => {
    const emailRecipients = `r3ndydinar@gmail.com, ${user.email}`;
    try {
      // send mail with defined transport object
      await emailTransporter.sendMail({
        from: fromAdmin, // sender address
        to: emailRecipients, // list of receivers
        subject: `Welcome to SEMNAS UNKRISWINA SUMBA`, // Subject line
        text: `
Hallo ${user.username},


Langkah terakhir, silakan melakukan verifikasi akun melalui link berikut: ${FRONTEND_URL}/verify?userId=${user.userId}&tokenVerify=${user.tokenVerify}


        `,
        // plain text body
        //   html: `
        // <div>
        // <p> Welcome to ${APP_NAME}, thanks for using us. Currently we still on alpha testing </p>
        // </div>`,
      });

      // console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      resolve(true);
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });

export const sendEmailResetPassword = (user: {
  username: string;
  email: string;
  userId: string | any;
  otpResetPassword: string;
}) =>
  new Promise(async (resolve, reject) => {
    try {
      const emailRecipients = `r3ndydinar@gmail.com, ${user.email}`;
      // send mail with defined transport object
      await emailTransporter.sendMail({
        from: fromAdmin, // sender address
        to: emailRecipients, // list of receivers
        subject: `Reset Password SEMNAS UNKRISWINA SUMBA`, // Subject line
        text: `
Hallo ${user.username},

OTP Reset Password: ${user.otpResetPassword}

        `,
        // plain text body
        //   html: `
        // <div>
        // <p> Welcome to ${APP_NAME}, thanks for using us. Currently we still on alpha testing </p>
        // </div>`,
      });

      // console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      resolve(true);
    } catch (err) {
      console.log('err', err);
      reject(err);
    }
  });
