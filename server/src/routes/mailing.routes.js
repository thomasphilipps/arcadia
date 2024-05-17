const nodemailer = require('nodemailer');

module.exports = (app) => {
  let transporter = null;
  if (process.env.NODE_ENV === 'prod') {
    transporter = nodemailer.createTransport({
      host: 'your host',
      port: 'your port',
      secure: false,
      auth: {
        user: 'the user of smtp',
        password: 'the password',
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  }

  app.post('/api/send-email', (req, res) => {
    const { to, subject, text, html } = req.body;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('Email sent: ' + info.response);
    });
  });
};
