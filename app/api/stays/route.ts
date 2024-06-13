import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUsers";
import { NextApiResponse } from "next";


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json();

    const {
        title,
        hotelLink,
        imageSrc,
        createAt,
        category,
        roomCount,
        bathRoomCount,
        guestCount,
        bedcount,
        bedroomCount,
        ratings,
        hostExperience,
        county,
        bedPhotos,
        town,
        bedroom,
        beds,
        offers,
        hostPhoto,
        userId,
        price,
        type,
        offerPrice,
        hostName,
        verified,
        joinDate,
        hostType,
        hostEmail,
        hostContact,
        distance,
        overView,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const listing = await prisma.listing.create({
        data: { 
        title,
        hotelLink,
        imageSrc,
        createAt,
        category,
        roomCount,
        bathRoomCount,
        bedPhotos,
        guestCount,
        bedcount,
        bedroomCount,
        ratings,
        hostExperience,
        county,
        town,
        bedroom,
        beds,
        type,
        offers,
        hostPhoto,
        price: parseInt(price, 10),
        offerPrice: parseInt(offerPrice, 10),
        hostName,
        verified,
        joinDate,
        hostType,
        hostEmail,
        hostContact,
        distance,
        overView, 
        userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}


export async function GET(req:NextRequest, res:NextApiResponse) {

    try {
        //const { searchParams } = new URL(req.nextUrl);  

    // const { destination } = req.query;
    let roomss = req.nextUrl.searchParams.get("rooms")
    let childrenn = req.nextUrl.searchParams.get("children")
    let adultss = req.nextUrl.searchParams.get("adults")
    let cityValue = req.nextUrl.searchParams.get("city")
    let countyValue = req.nextUrl.searchParams.get("county")
    let continentValue = req.nextUrl.searchParams.get('continent')
    let checkinDateValue = req.nextUrl.searchParams.get('checkinDate')
    let checkoutDateValue = req.nextUrl.searchParams.get('checkoutDate')
  
    let county= countyValue !== 'undefined' ? countyValue : '';
    let rooms= roomss !== 'undefined' ? roomss : 0;
    let adults= adultss !== 'undefined' ? adultss : 0;
    let children= childrenn !== 'undefined' ? childrenn : 0;
    let city = cityValue !== 'undefined' ? cityValue : '';
    let checkinDate = checkinDateValue !== 'undefined' ? checkinDateValue : '';
    let checkoutDate = checkoutDateValue !== 'undefined' ? checkoutDateValue : '';

    console.log("County----->", county)
    console.log("checkinDate-->", checkinDate)
    console.log("checkoutDate-->", checkoutDate)

    console.log('Rooms', rooms)
    console.log("adults", adults)
    console.log("children", children)
    let searchParamss: any = {};

        // Remove the userId from the destructuring and handle it separately
       //const { userId: userIdParam, ...restParams } = params || {};
       if(county && county ==='all')
        {
            
            const tours = await prisma.tour.findMany({
                where: searchParamss,
                orderBy: {
                    createAt: 'desc'
                }
            });
        
            const safeTour = tours.map((tour) => ({
                ...tour,
                createAt: tour.createAt.toISOString(),
            }));
        
            return NextResponse.json(safeTour);
        }
        else 
        {



            let searchParamss = {};

    // Existing city and county filters
    if (county && county !== '') {
        searchParamss.county = county;
    }
    if (city && city !== '') {
        searchParamss.town = city;
    }

    let dateFilters = {};

    if (checkinDateValue && checkinDateValue !== 'undefined' && checkoutDateValue && checkoutDateValue !== 'undefined') {
        const start = new Date(checkinDateValue);
        const end = new Date(checkoutDateValue);

        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            dateFilters = {
                datesUnavailable: {
                    none: {
                        between: [start, end]
                    }
                }
            };
        }
    }
    // Build the query object for Prisma
    let query = {
        where: {
            ...searchParamss,
            // Add conditions for date range
           ...dateFilters, 
            // Add conditions for guest counts
            rooms: {
                gte: parseInt(rooms, 10)  
            },
            adults: {
                gte: parseInt(adults, 10)
            },
            children: {
                gte: parseInt(children, 10)
            }
        },
        orderBy: {
            createAt: 'desc'
        }
    };

    console.log("Search query", query);

    try {
        const listings = await prisma.listing.findMany(query);

        const safeListing = listings.map((listing) => ({
            ...listing,
            createAt: listing.createAt.toISOString(),
        }));
        
        console.log("Back end listing---->", safeListing);
        return NextResponse.json(safeListing);
    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json({ error: 'Error fetching listings' }, { status: 500 });
    }



    //     if (county && county!=='') {
    //         searchParamss.county =  county;
    //     }
    //     if (city && city!=='') {
    //         searchParamss.town =  city;
    //     }

    //     console.log("Search params", searchParamss)

    //     // if (category) {
    //     //     query.category = category;
    //     // }
    
    // const listings = await prisma.listing.findMany({
    //     where: searchParamss,
    //     orderBy: {
    //         createAt: 'desc'
    //     }
    // });

    // const safeListing = listings.map((listing) => ({
    //     ...listing,
    //     createAt: listing.createAt.toISOString(),
    // }));
    // console.log("Back end listing---->", safeListing)
    // return NextResponse.json(safeListing);
}
} catch (error) {
       console.log("Error----  ", error) 
}
}
