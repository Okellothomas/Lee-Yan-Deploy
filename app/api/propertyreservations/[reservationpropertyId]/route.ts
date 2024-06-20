import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    propertyreservationId?: string;
};

export async function DELETE(
    request: Request, 
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { propertyreservationId } = params;

    if (!propertyreservationId || typeof propertyreservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const propertyreservation = await prisma.propertyRreservation.deleteMany({
        where: {
            id: propertyreservationId,
            OR: [
                { userId: currentUser.id },
                { Property: { userId: currentUser.id } } // intial input is listing instead of Listing
            ]
        }
    });

    return NextResponse.json(propertyreservation);
}