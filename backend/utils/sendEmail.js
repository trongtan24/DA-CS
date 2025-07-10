import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,    
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"B8K" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Gửi email đến:", to);
  } catch (error) {
    console.error("Gửi email thất bại:", error);
  }
};

export default sendEmail;
