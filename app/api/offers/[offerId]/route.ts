import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import prisma from "@/app/libs/prismadb";

interface IParams {
    offerId?: string;
}

export async function DELETE(
    request: Request,
    {params} : {params : IParams}
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { offerId } = params;

    if (!offerId || typeof offerId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.offers.deleteMany({
        where: {
            id: offerId,
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

    const { offerId } = params;

    if (!offerId || typeof offerId !== 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.offers.findUnique({
        where: {
            id: offerId
        }
    });
   

    if (!listing) {
         return NextResponse.json({ message: "Internal Server Error" }, { status: 404 });
    }

    return NextResponse.json(listing);
}

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
  
    const { offerId } = params;
    const formData = await request.json(); // Assuming JSON data

    {/* title       
 days             
 category    
 type            
 subtitle       
 county      
 town        
 inclusion       
 price       

 offerprice   */}
    const offer = await prisma.offers.findUnique({ where: { id:offerId } });


    const {id,title ,      
     days,            
    category,    
 type,           
 subtitle,       
 county,      
 town,        
 inclusion,       
 price,       
 
 offerprice
    } = formData

          
   
         
        
         
    const finalUpdateValues ={
        offerprice: parseInt(offerprice, 10),
     
      price: parseInt(price, 10),
      title:title,
      county:county,
      days:days,            
      category:category,        
      type:type,            
      subtitle:subtitle,           
      town:town,            
      inclusion:inclusion,       

    //   continent:continent,
    
    }

    try {

      const updateOffer = await prisma.offers.update({
        where: {
          id: offerId,
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
