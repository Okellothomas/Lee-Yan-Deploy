// import prisma from '@/app/libs/prismadb';

// export interface IListingsParams {
//     userId?: string;
//     guestCount?: number;
//     roomCount?: number;
//     bathroomCount?: number;
//     startDate?: string;
//     endDate?: string;
//     locationValue?: string;
//     category?: string;
// }

// export default async function getListings(
//     params: IListingsParams
// ) {
//     try {
//         const {
//             userId,
//             roomCount,
//             guestCount,
//             // bathRoomCount,
//             locationValue,
//             startDate,
//             endDate,
//             category
//         } = params; 
        
//         let query: any = {};

//         // Remove the userId from the destructuring and handle it separately
//        const { userId: userIdParam, ...restParams } = params || {};

//         if (userIdParam) {
//             query.userId = userIdParam;
//         }

//         if (category) {
//             query.category = category;
//         }

//         if (roomCount) {
//             query.roomCount = {
//                 gte: +roomCount
//             }
//         }

//         if (guestCount) {
//             query.guestCount = {
//                 gte: +guestCount
//             }
//         }

//         // if (bathroomCount) {
//         //     query.bathroomCount = {
//         //         gte: +bathroomCount
//         //     }
//         // }

//         if (locationValue) {
//             query.locationValue = locationValue;
//         }

//         if (startDate && endDate) {
//             query.NOT = {
//                 reservations: {
//                     some: {
//                         OR: [
//                             {
//                                 endDate: { gte: startDate },
//                                 startDate: {lte: startDate},
//                             },
//                             {
//                                 startDate: { lte: endDate },
//                                 endDate: {gte: endDate}
//                             }
//                        ] 
//                     }
//                 }
//             }
//         }

//         const listings = await prisma.listing.findMany({
//             where: query,
//             orderBy: {
//                 createAt: 'desc'
//             }
//         });

//         const safeListing = listings.map((listing) => ({
//             ...listing,
//             createAt: listing.createAt.toISOString(),
//         }));

//         return safeListing; 
        
//     } catch (error: any) {
//         throw new Error(error);
//     }
// }

import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(
    params: IListingsParams = {}
) {
    try {
        const {
            userId,
            roomCount,
            guestCount,
            // bathRoomCount,
            locationValue,
            startDate,
            endDate,
            category
        } = params; 
        
        let query: any = {};

        // Remove the userId from the destructuring and handle it separately
        const { userId: userIdParam, ...restParams } = params;

        if (userIdParam) {
            query.userId = userIdParam;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        // if (bathroomCount) {
        //     query.bathroomCount = {
        //         gte: +bathroomCount
        //     }
        // }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createAt: 'desc'
            }
        });

        const safeListing = listings.map((listing) => ({
            ...listing,
            createAt: listing.createAt.toISOString(),
        }));

        return safeListing; 
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}
