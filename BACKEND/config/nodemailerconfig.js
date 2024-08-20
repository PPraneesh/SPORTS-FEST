const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parshipraneesh8@gmail.com",
    pass: "gyrfhyhfoyeikibk",
  },
});

module.exports = transporter;