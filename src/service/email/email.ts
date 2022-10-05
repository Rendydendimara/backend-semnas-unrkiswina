import { ISendEmailGlobal } from '../../interface/IEmail';
import { APP_NAME } from '../../config';
import emailTransporter from '../../config/email';

const fromAdmin = 'hi@dbmaid.com'; // `${APP_NAME}@Admin info@dbmaid.com`;

export const serviceSendEmailGlobal = (data: ISendEmailGlobal) =>
  new Promise(async (resolve, reject) => {
    try {
      // send mail with defined transport object
      await emailTransporter.sendMail({
        from: fromAdmin, // sender address
        to: data.email, // list of receivers
        subject: data?.subject ?? `DBMAID`, // Subject line
        text: data?.content ?? 'Hay',
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
