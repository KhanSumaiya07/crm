import nodemailer from 'nodemailer';

export default async function sendEmail(to, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pranshugupta641@gmail.com",
      pass: "jtzajosznyyskosx", // App password
    },
  });

  await transporter.sendMail({
    from: '"Eduwire System" <pranshugupta641@gmail.com>',
    to,
    subject,
    text: message,
  });

  console.log(`✅ Email sent to ${to}`);
}
