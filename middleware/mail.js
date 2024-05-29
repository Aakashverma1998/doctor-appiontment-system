const nodemailer = require("nodemailer");

const userForgetPassword = async (data) => {
  // Create a transporter object using SMTP
  let transporter = nodemailer.createTransport({
    service: "gmail", // If you're using Gmail
    auth: {
      user: "aakash19@navgurukul.org", // Your email address
      pass: "", // Your password or app-specific password
    },
  });

  // Setup email data
  let mailOptions = {
    from: "aakash19@navgurukul.org", // sender address
    to: `${data.email}`, // list of receivers
    subject: "ResetPassword Link", // Subject line
    html: `<b>Hello ${data.name}, your resetpassword link:- http://localhost:3000/api/v1/user/resetPassword/${data._id}</b>`, // html body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred:", error);
    }
    console.log("Message sent successfully!");
    console.log("Message ID:", info.messageId);
  });
};

const userVerifyMail = async (data) => {
  // Create a transporter object using SMTP
  let transporter = nodemailer.createTransport({
    service: "gmail", // If you're using Gmail
    auth: {
      user: "aakash19@navgurukul.org", // Your email address
      pass: "", // Your password or app-specific password
    },
  });

  // Setup email data
  let mailOptions = {
    from: "aakash19@navgurukul.org", // sender address
    to: `${data.email}`, // list of receivers
    subject: "VerifyMail Link", // Subject line
    html: `<b>Hello ${data.name}, your VerifyMail link:- http://localhost:3000/api/v1/user/verifyMail/${data._id}</b>`, // html body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred:", error);
    }
    console.log("Message sent successfully!");
    console.log("Message ID:", info.messageId);
  });
};

module.exports = {
  userForgetPassword,
  userVerifyMail
};
