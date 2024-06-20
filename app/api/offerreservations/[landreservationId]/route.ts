import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    offerreservationId?: string;
};

export async function DELETE(
    request: Request, 
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { offerreservationId } = params;

    if (!offerreservationId || typeof offerreservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const offerreservation = await prisma.offersReservation.deleteMany({
        where: {
            id: offerreservationId,
            OR: [
                { userId: currentUser.id },
                { Offers: { userId: currentUser.id } } // intial input is listing instead of Listing
            ]
        }
    });

    return NextResponse.json(offerreservation);
}