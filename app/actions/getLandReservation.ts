import prisma from "@/app/libs/prismadb";

interface IParams {
    landId?: string;
    tourId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getLandReservation(params: IParams) {
    try {
        const { landId, userId, tourId, authorId } = params || {};

        const query: any = {};

        if (landId) {
            query.landId = landId;
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

        const landreservations = await prisma.landReservation.findMany({
            where: query,
            include: {
                Land: true,
                user:true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeLandRreservation = landreservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            Land: {
                ...reservation.Land,
                createAt: reservation.Land?.createdAt.toISOString(), // Corrected field name
            },
        }));

        return safeLandRreservation;
    } catch (error: any) {
        throw new Error(error);
    }
}

