import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing)
}


export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.findUnique({
        where: {
            id: listingId
        }
    });
   

    if (!listing) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(listing);
}






const generateDateRange = (startDate:any, endDate:any) => {
  const dates = [];
  let currentDate = new Date(startDate);
  let end = new Date(endDate)

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export async function PUT(
    request: Request,
    { params }: { params: IParams }
  ) {
  
    console.log("Update reached...")
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.json({
          message: "Unauthorised"
        }, {
          status: 401,
        }) // Return 401 for unauthorized access
    }
  
    const { listingId } = params;
    const {anUpdate,formData} = await request.json(); // Assuming JSON data


    const listing = await prisma.listing.findUnique({ where: { id:listingId } });

if(anUpdate)
  {
    const {
      title,
      hotelLink,
      category,
      roomCount,
      bathRoomCount,
      guestCount,
      bedCount,
      bedroomCount,
      childrenCount,
      funActivities,
      meals,
      hostExperience,
      county,
      town,
      type,
      // booked,
      bedroom,
      // beds,
      offers,
      price,
      offerPrice,
      hostName,
      joinDate,
      hostType,
      hostEmail,
      hostContact,
      distance,
      overView
    } = formData;
    
    const finalUpdateValues = {
      title,
      hotelLink,
      category,
      roomCount: parseInt(roomCount, 10),
      bathRoomCount: parseInt(bathRoomCount, 10),
      guestCount: parseInt(guestCount, 10),
      bedcount: parseInt(bedCount, 10),
      bedroomCount: parseInt(bedroomCount, 10),
      childrenCount: parseInt(childrenCount, 10),
      funActivities,
      meals,
      hostExperience,
      county,
      town,
      type,
      // booked: Boolean(booked),
      bedroom,
      // beds: parseInt(beds, 10),
      offers,
      price: parseInt(price, 10),
      offerPrice: parseInt(offerPrice, 10),
      hostName,
      joinDate,
      hostType,
      hostEmail,
      hostContact,
      distance: distance.toString(),
      overView
    };
  
    try {

      const updateOffer = await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: finalUpdateValues, // Use updatedTourData object for selective updates
      });
      return NextResponse.json(updateOffer);

    } catch (error) {

      console.error("Error updating tour:", error);
      return NextResponse.json({
          message: "Internal Server error"
        }, {
          status: 500,
        }) 
        // Return 500 for unexpected errors
    }
  }
  else
  {
    const {id,guestCount,save, roomCount,
      title, overView, house, hotel, hostName,datesUnavailableFrom, datesUnavailableTo, cohostName, hostContact, hotelLink, oneBedroom, twoBedroom, threebedRoom, commonPlace,price, description
    } = formData

    const dateRange = generateDateRange(datesUnavailableFrom, datesUnavailableTo);  
    console.log("date ranges",dateRange)
    try {

      const updateStay = await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: { datesUnavailable: { push: dateRange } }, // Use updatedTourData object for selective updates
      });
      return NextResponse.json(updateStay);

    } catch (error) {

      console.error("Error updating tour:", error);
      return NextResponse.json({
          message: "Internal Server error"
        }, {
          status: 500,
        }) 
        // Return 500 for unexpected errors
    }

  }
      
    }