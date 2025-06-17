import nodemailer from 'nodemailer';

export default async function sendEmail(to, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pranshugupta641@gmail.com", // your Gmail
      pass: "jtzajosznyyskosx", // your 16-digit Gmail app password
    },
  });

  await transporter.sendMail({
    from: '"Eduwire System" <pranshugupta641@gmail.com>',
    to,
    subject: 'Consultancy Update',
    text: message,
  });
  
  console.log(`✅ Email sent to ${to}:`);
}
