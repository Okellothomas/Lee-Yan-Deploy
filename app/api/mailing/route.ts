// // mailingHandler.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import nodemailer from 'nodemailer';
// import path from "path"
// import fs from "fs"


// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'leeyan.smartproperties1@gmail.com',  // Your Gmail email address
//     pass: 'sqzoillitknzlipo'    // Your Gmail password or an app-specific password
//   }
// });

// export async function POST(req: Request, res: NextApiResponse) {

 
//  if (req.method === 'POST') {
   
   
//       const year = new Date().getFullYear(); // Or fetch dynamically if needed

      
//       const body = await req.json();
      
//       const { sender, recipient, subject, mail_body, user_name, templateName, baseUrl } = body;
//       console.log(templateName)
//       const templatePath = path.join(__dirname, `../../../../../templates/${templateName}.html`);

//       const tourUrl = `${baseUrl}/client/profile`
//       const templateHTML = fs.readFileSync(templatePath, 'utf8');

//   const renderedHTML = templateHTML
//   .replace(/\{recipientName\}/g, user_name)
//   .replace(/\{year\}/g, year.toString())
//   .replace(/\{tourUrl}/g, tourUrl);

//     try {
//       const info = await transporter.sendMail({
//         from: sender,
//         to: recipient,
//         subject,
//         html: renderedHTML , // use HTML for formatted content
//       });

      

//       console.log("mail sent");
//       res.status(200).json({ message: 'Email sent successfully!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error sending email!' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed!' });
//   }

// };

import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import path from "path";
import fs from "fs";

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'leeyan.smartproperties1@gmail.com',  // Your Gmail email address
    pass: 'sqzoillitknzlipo'    // Your Gmail password or an app-specific password
  }
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const year = new Date().getFullYear();

    const body = await req.json();
    const { sender, recipients, subject, mail_body, title, checkIn, checkOut, templateName, baseUrl } = body;

    // const templatePath = path.join(__dirname, `../../../../../templates/${templateName}.html`);
    // const templateHTML = fs.readFileSync(templatePath, 'utf8');
    const tourUrl = `${baseUrl}/client/profile`;

    try {
      const emailPromises = recipients.map(async ({ email, name }) => {
        
        let templatePath; //= path.join(__dirname, `../../../../../templates/${templateName}.html`);
        if(name === 'Admin')
          {
         templatePath = path.join(__dirname, `../../../../../templates/admin_template.html`);
          } 
          else {
            templatePath = path.join(__dirname, `../../../../../templates/${templateName}.html`);
          }
        const templateHTML = fs.readFileSync(templatePath, 'utf8');
        const renderedHTML = templateHTML
          .replace(/\{recipientName\}/g, name)
          .replace(/\{title\}/g, title)
          .replace(/\{checkIn\}/g, checkIn)
          .replace(/\{checkOut\}/g, checkOut)
          .replace(/\{year\}/g, year.toString())
          .replace(/\{tourUrl}/g, tourUrl);

        return transporter.sendMail({
          from: sender,
          to: email,
          subject,
          html: renderedHTML, // use HTML for formatted content
        });
      });

      await Promise.all(emailPromises);

      console.log("All emails sent");
      res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending emails!' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}





