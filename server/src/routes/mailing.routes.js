const { authenticate } = require('../middlewares/auth');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

module.exports = (app) => {
  let transporter = null;

  if (process.env.NODE_ENV === 'production') {
    const myOAuth2Client = new OAuth2(
      process.env.OAUTH_ID,
      process.env.OAUTH_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    myOAuth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_USER,
        clientId: process.env.OAUTH_ID,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: myOAuth2Client.getAccessToken(),
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  app.post('/api/send-email', (req, res) => {
    const { from, to, subject, text, html } = req.body;

    const mailOptions = {
      from: from || process.env.SMTP_USER,
      to,
      subject,
      text,
      html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: error.toString() });
      }
      res.status(200).json({ message: 'Email sent', response: info.response });
    });
  });
};
