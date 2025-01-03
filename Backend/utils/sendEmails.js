import nodemailer from "nodemailer"

async function sendMail(userEmail, subject, htmlTemplate){
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Connect-LR <${process.env.APP_EMAIL}>`,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email Sent: " + info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (nodemailer)");
  }
}

export default sendMail
