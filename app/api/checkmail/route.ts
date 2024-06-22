// import { IUsersParams } from "@/app/actions/getClients";
// import getUsers from "@/app/actions/getUsers";
import prisma from '@/app/libs/prismadb';

// import { NextApiRequest, NextApiResponse } from "next";

// export async function GET(req:NextApiRequest, res:NextApiResponse) {

//     if (req.method === 'GET') {
//       try {
//         const {
//             id,
//             name,
//             email,
//             userType
//         } = req.body || {};

//         let query: any = {};

//         if (id) {
//             query.id = id;
//         }

//         if (name) {
//             query.name = name;
//         }

//         if (email) {
//             query.email = email;
//         }

//         if (userType === "client") {
//             query.userType = "client";
//         }

//         // ... (other filters)...
        
//         const users = await prisma.user.findMany({
//             where: query,
//             // orderBy: {
//             //     createAt: 'desc'
//             // }
//         });

//         const safeUsers = users.map((user: any) => ({
//             ...user,
//             // createAt: user.createAt.toISOString(),
//         }));

//         console.log("Users from backend", safeUsers)
//         return safeUsers;
//     } catch (error: any) {
//         throw new Error(error);
//     }
// } else {
//     res.status(405).json({ message: 'Method Not Allowed' }); // Handle unsupported methods
//   }
// }



//import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
   
        console.log("Backend reached....");
        try {
            const body = await req.json();
            const { email } = body;

            console.log('Email back', email)

            if (!email) {
                return NextResponse.json({status:400})
            }

            const user = await prisma.user.findUnique({
                where: { email: String(email) },
            });

            const emailExists = !!user;
            console.log('Email exists:', emailExists);
 
            return NextResponse.json({ exists: emailExists });
            //res.status(200).json({ exists: emailExists });
        } catch (error) {
            console.error('An error occurred:', error);
            return NextResponse.json({ resultcode: 500, error: 'An error occurred' });
        }
    } 

