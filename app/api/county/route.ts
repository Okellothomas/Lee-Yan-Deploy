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
    days,
    action,
    category,
    type,
    town,
    county, 
    subtitle,
    inclusion,
    imageSrc,
    price,
    offerprice,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const offer = await prisma.offers.create({
        data: {
            title,
            days,
            action,
            category,
            type,
            subtitle,
            inclusion,
            imageSrc,
            town, 
            county,
            price: parseInt(price, 10),
            offerprice: parseInt(offerprice, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(offer);
}