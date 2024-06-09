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
        roomCount,
        bathRoomCount,
        bedRoomCount,
        toiletCount,
        county,
        category,
        town,
        size,
        imageSrc,
        availability,
        type,
        parking_space,
        price,
        offerPrice,
        amenities,
        overview,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const property = await prisma.property.create({
        data: {
        title,
        roomCount,
        bathRoomCount,
        bedRoomCount,
        toiletCount,
        county,
        category,
        town,
        size,
        imageSrc,
        availability,
        type,
        parking_space,
        amenities,
        overview,
        price: parseInt(price, 10),
        offerPrice: parseInt(offerPrice, 10),
        userId: currentUser.id
        }
    });

    return NextResponse.json(property);
}


export async function GET(req:NextRequest, res:NextApiResponse) {

    try {
        //const { searchParams } = new URL(req.nextUrl);  

    // const { destination } = req.query;
    let cityValue = req.nextUrl.searchParams.get("city")
    let countryValue = req.nextUrl.searchParams.get("country")
    let continentValue = req.nextUrl.searchParams.get('continent')
    let checkinDateValue = req.nextUrl.searchParams.get('checkinDate')
    let checkoutDateValue = req.nextUrl.searchParams.get('checkoutDate')
  
    let country= countryValue !== 'undefined' ? countryValue : '';
    let city = cityValue !== 'undefined' ? cityValue : '';
    let checkinDate = checkinDateValue !== 'undefined' ? checkinDateValue : '';
    let checkoutDate = checkoutDateValue !== 'undefined' ? checkoutDateValue : '';

    console.log("----->", country)
    console.log("Country----->", country)
    console.log("checkinDate-->", checkinDate)
    console.log("checkoutDate-->", checkoutDate)
    let searchParamss: any = {};

        // Remove the userId from the destructuring and handle it separately
       //const { userId: userIdParam, ...restParams } = params || {};
       if(country && country ==='all')
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



        if (country && country!=='') {
            searchParamss.country =  country.toLowerCase();
        }
        if (city && city!=='') {
            searchParamss.city =  city;
        }

        console.log("Search params", searchParamss)

        // if (category) {
        //     query.category = category;
        // }
    
    const listings = await prisma.listing.findMany({
        where: searchParamss,
        orderBy: {
            createAt: 'desc'
        }
    });

    const safeListing = listings.map((listing) => ({
        ...listing,
        createAt: listing.createAt.toISOString(),
    }));
    console.log("Back end listing---->", safeListing)
    return NextResponse.json(safeListing);
}
} catch (error) {
       console.log("Error----  ", error) 
}
}
