const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

    console.log("process.env.SMTP_HOST" , process.env.SMTP_HOST);
    console.log("process.env.SMTP_PORT" , process.env.SMTP_PORT);
    console.log("process.env.SMTP_USER" , process.env.SMTP_USER);
    console.log("process.env.SMTP_PASSWORD" , process.env.SMTP_PASSWORD);

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b0056a29f2d1be",
    pass: "e03887a9310390"
  }
});

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;