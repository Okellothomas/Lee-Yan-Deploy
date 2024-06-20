import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    landreservationId?: string;
};

export async function DELETE(
    request: Request, 
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { landreservationId } = params;

    if (!landreservationId || typeof landreservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const landreservation = await prisma.landRreservation.deleteMany({
        where: {
            id: landreservationId,
            OR: [
                { userId: currentUser.id },
                { Land: { userId: currentUser.id } } // intial input is listing instead of Listing
            ]
        }
    });

    return NextResponse.json(landreservation);
}