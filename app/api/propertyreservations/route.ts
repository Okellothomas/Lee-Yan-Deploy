import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUsers";

export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      propertyId,
      paymentDetails,
    } = body;

    // if (!listingId || !startDate || !endDate || !amountPayable) {
    //   return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    // }

    if (!propertyId || !paymentDetails) {
        console.error("Missing required fields:", { propertyId, paymentDetails});
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
      }
    const propertyAndReservation = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        propertyreservations: {
          create: {
            userId: currentUser.id,
            paymentDetails,
          },
        },
      },
    });

    return NextResponse.json(propertyAndReservation);
  } catch (error) {
    console.error("server error occured:- ", error);
    // Set a generic error status code with a JSON response (optional)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
