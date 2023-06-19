import nodemailer from "nodemailer";
import dotenv from "dotenv";
import qrcodeGenerator from "./qr-code-generator.js";
dotenv.config();

const PORT = process.env.EMAIL_PORT;
const SMTP_PORT = process.env.SMTP_PORT;
const HOST_SERVICE = process.env.HOST_SERVICE;

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

const SENDERS_EMAIL = "adarsh.igtechso@gmail.com";
let RECEIVERS_EMAIL = "adarsh91094@gmail.com";
const CC = [];
const BCC = [];

const EMAIL_SUBJECT = "Code";
let EMAIL_BODY_HTML;
let qrCodeImage;
const fillValues = async (email, data) => {
  RECEIVERS_EMAIL = email;
  console.log(data);
};

const transporter = nodemailer.createTransport({
  host: HOST_SERVICE,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

const sendMail = async (email, data) => {
  qrCodeImage = await qrcodeGenerator(data);
  fillValues(email, qrCodeImage);
  const emailOptions = {
    from: SENDERS_EMAIL,
    to: RECEIVERS_EMAIL,
    cc: CC,
    bcc: BCC,
    subject: EMAIL_SUBJECT,
    html: `<p>Please find the QR code attached: ${qrCodeImage}</p><img src="${qrCodeImage}">`,
    attachments: [
      {
        filename: "qrcode.png",
        content: qrCodeImage.split(";base64,").pop(),
        encoding: "base64",
      },
    ],
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

sendMail("adarsh91094@gmail.com", "adarsh");

export default sendMail;
