import prisma from "@/app/libs/prismadb";

interface IParams {
    propertyId?: string;
    tourId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getPropertyReservation(params: IParams) {
    try {
        const { propertyId, userId, tourId, authorId } = params || {};

        const query: any = {};

        if (propertyId) {
            query.propertyId = propertyId;
        }

        if (tourId) {
            query.tourId = tourId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.Listing = {
                userId: authorId,
            };
        }

        const propertyreservations = await prisma.propertyRreservation.findMany({
            where: query,
            include: {
                Property: true,
                user:true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safePropertyRreservation = propertyreservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            Property: {
                ...reservation.Property,
                createAt: reservation.Property?.createdAt.toISOString(), // Corrected field name
            },
        }));

        return safePropertyRreservation;
    } catch (error: any) {
        throw new Error(error);
    }
}

