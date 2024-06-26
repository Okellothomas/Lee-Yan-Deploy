// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// export async function POST(req: NextRequest) {
//   try {
//     const { sender, recipients, subject, message } = await req.json();

//     // Create a Nodemailer transporter
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'leeyan.smartproperties1@gmail.com',  // Your Gmail email address
//           pass: 'sqzoillitknzlipo'    // Your Gmail password or an app-specific password
//         }
//       });

//     const mailOptions = {
//       from: sender,
//       to: recipients.map((recipient: any) => recipient.email).join(', '),
//       subject: subject,
//       text: message,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
//   }
// }


// app/api/mailing/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { sender, subject, message } = await req.json();

     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'leeyan.smartproperties1@gmail.com',  // Your Gmail email address
          pass: 'sqzoillitknzlipo'    // Your Gmail password or an app-specific password
        }
      });

    const mailOptions = {
      from: sender,
      to: 'leeyan.smartproperties1@gmail.com',
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}






