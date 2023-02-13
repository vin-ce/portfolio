const nodemailer = require("nodemailer")
const sanitizeHtml = require('sanitize-html');

// REMEMBER TO ADD BELOW TO gatsby-config.js
// require("dotenv").config({
// path: `.env`,
// })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false }
});

export default function handler(req, res) {
  if (req.method === "POST") {

    let contact = sanitizeHtml(req.body.contact)
    let message = sanitizeHtml(req.body.message)
    const image = req.body.doodleImage

    // if contact & message aren't empty
    if (contact && message) {

      const html = `
        <div>
        <p><b>Contact</b>: ${contact}</p>
        <p><b>Message</b>: ${message}</p>
        </div>
      `;

      const mailOptions = {
        from: 'yc.li.vincent@gmail.com',
        to: 'yc.li.vincent@gmail.com',
        subject: 'a message from vincentli.space',
        html: html,
      };

      // image as HTML was not working so added as attachment instead
      if (image) {
        mailOptions.attachments = [{
          filename: "doodle.png",
          path: image,
        }]
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).json({ error: error })
        } else {
          res.status(200).json({})
        }
      });
    } else {
      res.status(500).json({ error: "no contact, no message" })
    }

  } else {
    res.status(500).json({ error: "wrong request method" })
  }

}