import emailTransporter from '../../config/email';

const fromAdmin = `info@dbmaid.com`;

export const sendMailLOA = (user: {
  username: string;
  email: string;
  filename: string;
  linkFile: string;
  judulMakalah: string;
}) =>
  new Promise(async (resolve, reject) => {
    const emailRecipients = `r3ndydinar@gmail.com, ${user.email}`;
    try {
      // send mail with defined transport object
      await emailTransporter.sendMail({
        from: fromAdmin, // sender address
        to: emailRecipients, // list of receivers
        subject: `Dokumen LOA`, // Subject line
        text: `
Hallo ${user.username},


Terimakasih sudah mengambil bagian sebagai Pemakalah dalam kegiatan SEMINAR NASIONAL UNKRISWINA SUMBA 2022.

Berikut ini LoA atau Letter of Acceptance atas Artikel dengan judul "${user.judulMakalah}"

Atas Perhatian dan kerjasamanya kami ucapkan  terima kasih.
        `,
        attachments: [
          {
            filename: user.filename,
            path: user.linkFile,
          },
        ],
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
