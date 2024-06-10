import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUsers";


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
    category,
    size,
    covered_area,
    titleDeed,
    overview,
    type,
    town,
    county, 
    imageSrc,
    price,
    offerPrice,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const land = await prisma.land.create({
        data: {
            title,
            category,
            size,
            covered_area,
            titleDeed,
            overview,
            type,
            town,
            county, 
            imageSrc,
            price : parseInt(price, 10),
            offerPrice: parseInt(offerPrice, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(land);
}