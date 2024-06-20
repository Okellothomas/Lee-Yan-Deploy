import prisma from "@/app/libs/prismadb";

interface IParams {
    offerId?: string;
    tourId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getOfferReservation(params: IParams) {
    try {
        const { offerId, userId, tourId, authorId } = params || {};

        const query: any = {};

        if (offerId) {
            query.offerId = offerId;
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

        const offerreservations = await prisma.offersReservation.findMany({
            where: query,
            include: {
                Offers: true,
                user:true
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeOfferReservation = offerreservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            Offers: {
                ...reservation.Offers,
                createAt: reservation.Offers?.createdAt.toISOString(), // Corrected field name
            },
        }));

        return safeOfferReservation;
    } catch (error: any) {
        throw new Error(error);
    }
}

